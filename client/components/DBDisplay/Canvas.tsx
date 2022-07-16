// React & React Router & React Query Modules;
import React, { useState } from "react";
import { useMutation } from "react-query";

//Components imported;
import Table from "./Table";

// UI & Visualization Libraries
import axios from "axios";
import DataStore from "../../Store";
import Xarrow, { Xwrapper } from "react-xarrows";
import { DatabaseImport, DatabaseOff } from "tabler-icons-react";
import { Loader, Text, Button, Group } from "@mantine/core";

interface CanvasProps {
  fetchedData: {
    [key: string]: {
      [key: string]: {
        IsForeignKey: boolean;
        IsPrimaryKey: boolean;
        Name: string;
        References: any[];
        TableName: string;
        Value: any;
        additional_constraints: string | null;
        data_type: string;
        field_name: string;
      };
    };
  };
  isLoadingProps: boolean;
  isErrorProps: boolean;
  setFetchedData: (fetchedData: object) => void;
  setSideBarOpened: (param: boolean) => void;
}

/** Canvas Component - a canvas section where Tables being generated */
export default function Canvas({
  isLoadingProps,
  isErrorProps,
  fetchedData,
  setFetchedData,
}: CanvasProps) {
  /** useMutation for handling 'POST' request to '/api/handleQueries' route for executing series of queries for DB migration; 
  onSuccess: Once queries get complete, it will clear out the sessionStorage and render the latestTableModel confirming the success of migration
  */
  const { isLoading, isError, mutate } = useMutation(
    (dbQuery: object) => {
      return axios.post("/api/handleQueries", dbQuery).then((res) => {});
    },
    {
      onSuccess: () => {
        const latestTableModel: any = DataStore.getData(
          DataStore.store.size - 1
        );
        DataStore.clearStore();
        DataStore.setQuery([{ type: "", query: "" }]);
        DataStore.setData(latestTableModel);
        sessionStorage.clear();
        setFetchedData(latestTableModel);
      },
      onError: () => {
        alert("Failed to execute changes");
      },
    }
  );

  /** "executeChanges" - a function that gets invoked when Execute button is clicked and trigger useMutation for POST request;
   *  Grabs the URI data and queries from global state "DataStore" and pass it into mutate method;
   */
  const executeChanges = () => {
    const obj = JSON.parse(JSON.stringify(DataStore.userDBInfo));

    // creating URI for server to connect to user's db
    let db_uri =
      "postgres://" +
      obj.username +
      ":" +
      obj.password +
      "@" +
      obj.hostname +
      ":" +
      obj.port +
      "/" +
      obj.database_name;

    // uri examples
    // DATABASE_URL=postgres://{user}:{password}@{hostname}:{port}/{database-name}
    // "postgres://YourUserName:YourPassword@YourHostname:5432/YourDatabaseName";
    const dbQuery = {
      queries: DataStore.getQuery(DataStore.queries.size - 1),
      uri: db_uri,
    };
    mutate(dbQuery);
  };

  /** "tables" is an array with Table components generated by iterating fetchedData */
  const tables: JSX.Element[] = Object.keys(fetchedData).map(
    (tablename: any, ind: number) => {
      return (
        <Table
          key={`Table${ind}`}
          id={tablename}
          tableInfo={fetchedData[tablename]}
          setFetchedData={setFetchedData}
          fetchedData={fetchedData}
        />
      );
    }
  );

  /** "refArray" is an array of Reference object where IsDestination is true */
  let refArray: string[] = [];
  for (let table in fetchedData) {
    for (let column in fetchedData[table]) {
      for (let ref in fetchedData[table][column].References) {
       // console.log('ref in fetchedData...table Colum.References');
       // console.log(fetchedData[table][column].References)
        if (fetchedData[table][column].References[ref].IsDestination == false)
          refArray.push(fetchedData[table][column].References[ref]);
      }
    }
  }

  /** "xa" is an array with Xarrow components generated by iterating through refArray
   * and assign start of the arrow to PrimaryKeyTableName & end of the arrow to ReferencesTableName*/
  const xa: JSX.Element[] = refArray.map((reff: any, ind:number) => {
    // console.log('in Xarrows PrimaryKeyTableName---------->')
    // console.log(reff.PrimaryKeyTableName)
    // console.log('in Xarrows FK Table Name')
    // console.log(reff.ReferencesTableName)
    // console.log('<------------------')
    return (
      <Xarrow
        key={ind}
        headSize={5}
        zIndex={-1}
        color={"black"}
        start={reff.ReferencesTableName}
        end={reff.PrimaryKeyTableName}
        endAnchor={[
          { position: "right", offset: { x: +10, y: +10 } },
          { position: "left", offset: { x: -10, y: -10 } },
          { position: "bottom", offset: { x: +10, y: +10 } },
          { position: "top", offset: { x: -10 } },
        ]}
        curveness={1.0}
        animateDrawing={2}
      />
    );
  });

  /** Truthy when the user is connecting to the database to grab the intial table model */
  if (isLoadingProps) {
    return (
      <div style={{textAlign: "center", fontSize: "18px", fontFamily: "Geneva", marginTop: "40px", marginRight: "225px"}}>
        {/* <Text> */}
          Please wait while we process your request.
          <br/>
          <Loader size="xl" variant="dots" />
        {/* </Text> */}
      </div>
    );
  }

  /** Truthy when the user has an issue grabbing the inital table model */
  if (isErrorProps) {
    return (
     <div style={{textAlign: "center", fontSize: "18px", fontFamily: "Geneva", marginTop: "40px", marginRight: "225px"}}>
        An error occurred while we processed your request. Please check your connection.
      </div>
    )
  }

  /** Truthy when the user is executing the queries for database migration */
  if (isLoading) {
    return (
      <div style={{textAlign: "center", fontSize: "18px", fontFamily: "Geneva", marginTop: "40px", marginRight: "225px"}}>
        {/* <Text> */}
          Please wait while we process your request.
          <br/>
          <Loader size="xl" variant="dots" />
        {/* </Text> */}
      </div>
    );
  }

  /** Truthy when the user fails to execute the queries for database migration */
  if (isError) {
    return (
      <div style={{textAlign: "center", fontSize: "18px", fontFamily: "Geneva", marginTop: "40px", marginRight: "225px"}}>
        An error occurred while we processed your request. Please check your connection.
      </div>
    )
  }

  const dbButtons = 
          <div >
          <Group position="right">
            <Button
              id="disconnectButton"
              variant="outline"
              color="dark"
              size="md"
              compact
              leftIcon={<DatabaseOff />}
              onClick={() => {
                sessionStorage.clear();
                DataStore.disconnect();
              }}
            >
              Disconnect database
            </Button>
          </Group>
          <Group position="right">
            <Button
              id="executeButton"
              color="dark"
              size="md"
              compact
              styles={() => ({
                root: {
                  marginTop: 10,
                },
              })}
              leftIcon={<DatabaseImport />}
              onClick={() => executeChanges()}
            >
              Execute changes
            </Button>
          </Group>
        </div>

  return (
    // style={{ height: "100%"}}
    <div>
      {Object.keys(fetchedData).length > 0 && DataStore.connectedToDB ? (
        <>
          {dbButtons}
        <div style={{display: "flex", flexFlow: "row wrap", justifyContent:"space-around", alignItems:"center"}}>
          <Xwrapper>
            {tables}
            {xa}
          </Xwrapper>
        </div>
        </>
      ) : Object.keys(fetchedData).length > 0 && DataStore.loadedFile ? (
        <>
          {/* <Group position="right">
            <Button
              color="white"
              leftIcon={<DatabaseImport />}
              onClick={() => setSideBarOpened(true)}
            >
              Connect to DB
            </Button>
          </Group> */}
          {/* <Group position="right">
            <Button id="disconnectButton"
              color="white"
              leftIcon={<DatabaseImport />}
              onClick={() => DataStore.disconnect()}
            >
              Disconnect from DB
            </Button>
          </Group>
          <Group position="right">
            <Button id="executeButton"
              styles={() => ({
                root: {
                  marginTop: 20,
                },
              })}
              color="red"
              leftIcon={<DatabaseImport />}
              onClick={() => executeChanges()}
            >
              Execute changes
            </Button>
          </Group> */}

        <div style={{display: "flex", flexFlow: "row wrap", justifyContent:"space-around", alignItems: "center"}}>
          <Xwrapper>
            {tables}
            {xa}
          </Xwrapper>
        </div>
        </>
      ) : (
        <>
          {/* "Please Connect to Your Database" */}
          <div style={{textAlign: "center", fontSize: "18px", fontFamily: "Geneva", marginTop: "40px", marginRight: "225px"}}>
            Welcome to dbSpy! Please connect your database or upload a SQL file to begin.</div>
          {/* <Group position="right">
            <Button
              color="white"
              leftIcon={<DatabaseImport />}
              onClick={() => setSideBarOpened(true)}
            >
              Connect to DB
            </Button>
          </Group> */}
        </>
      )}
    </div>
  );
}
