//for Flow
export interface RowProps {
  id: string;
  column: string;
  constraint: string;
  fk: boolean;
  pk: boolean;
  type: string;
  reference: {}[];
}

//for displayStore.ts
export interface StoreProps {
  []: {
    []: {
      Name: string;
      Value: any | null;
      TableName: string;
      References: [];
        {
          PrimaryKeyName: string;
          ReferencesPropertyName: string;
          PrimaryKeyTableName: string;
          ReferencesTableName: string;
          IsDestination: boolean;
          constrainName: string;
        }
,
      IsPrimaryKey: boolean;
      IsForeignKey: boolean;
      field_name: string;
      data_type: string;
      additional_constraints: string;
    }
}
}

//logStore type
export interface logProps {
  []: {
    Name: string;
    Setting: string;
    Source: string;
    SourceFile: string;
    Context: string;
  }
}

