import React from 'react';
import Profile from './Profile';
//profile imports
import AG from '../../assets/contributors/ag.jpg';
import JA from '../../assets/contributors/ja.jpg';
import KP from '../../assets/contributors/kp.jpg';
import TM from '../../assets/contributors/tm.jpg';
import BG from '../../assets/contributors/bg.jpg';
import EM from '../../assets/contributors/em.jpg';
import ML from '../../assets/contributors/ml.jpg';
import SL from '../../assets/contributors/sl.jpeg';
import KM from '../../assets/contributors/km.jpg';
import AR from '../../assets/contributors/ar.jpg';
import AA from '../../assets/contributors/aa.jpg';
import SG from '../../assets/contributors/sg.jpg';
import KW from '../../assets/contributors/kw.jpg';


//for future contributors: add your profile information to the profileList array as an object formatted as shown below, and it will auto-populate the home page with a new profile card

type profileInfo = {
  imgUrl: string,
  name: string,
  title: string,
  linkedInUrl: string,
  githubUrl: string
}
/*
Example:
{
  imgUrl: '[INSERT CONTRIBUTOR'S PROFILE PHOTO HERE]',
  name: 'Jane Doe',
  title: 'Software Engineer',
  linkedInUrl: '[INSERT LINKEDIN LINK HERE]',
  githubUrl: 'https://github.com/[INSERT GITHUB HANDLE HERE]'
}
*/

const profileList: profileInfo[] = [
  {imgUrl: AG, name: 'Angel Giron', title: 'Software Engineer', linkedInUrl: 'https://www.linkedin.com/in/acgiron/', githubUrl: 'https://github.com/g94angel'},
  {imgUrl: JA, name: 'John Paul Adigwu', title: 'Software Engineer', linkedInUrl: 'https://www.linkedin.com/in/johnpaul-adigwu/', githubUrl: 'https://github.com/engineerous'},
  {imgUrl: KP, name: 'Kevin Park-Lee', title: 'Software Engineer', linkedInUrl: 'https://www.linkedin.com/in/kevin38424/', githubUrl: 'https://github.com/kevin38424'},
  {imgUrl: TM, name: 'Tarik Mokhtech', title: 'Software Engineer', linkedInUrl: 'https://www.linkedin.com/in/tarik-mokhtech/', githubUrl: 'https://github.com/MockTech'},
  {imgUrl: BG, name: 'Brett Guidry', title: 'Software Engineer', linkedInUrl: 'https://www.linkedin.com/in/brett-guidry-6b6085107/', githubUrl: 'https://github.com/Lurkbot9000'},
  {imgUrl: EM, name: 'Emil Mebasser', title: 'Software Engineer', linkedInUrl: 'https://www.linkedin.com/in/emil-mebasser-a1a2a815/', githubUrl: 'https://github.com/ejmebasser'},
  {imgUrl: ML, name: 'Mimi Le', title: 'Software Engineer', linkedInUrl: 'https://www.linkedin.com/in/my-le-a94575226/', githubUrl: 'https://github.com/kawaiiyummy14'},
  {imgUrl: SL, name: 'Samson Lam', title: 'Software Engineer', linkedInUrl: 'https://www.linkedin.com/in/samson-lam-455846219/', githubUrl: 'https://github.com/sflam2013'},
  {imgUrl: KM, name: 'Kris Magat', title: 'Software Engineer', linkedInUrl: 'https://www.linkedin.com/in/kmag/', githubUrl: 'https://github.com/KrisMagat'},
  {imgUrl: AR, name: 'Adrian Reczek', title: 'Software Engineer', linkedInUrl: 'https://www.linkedin.com/in/adrian-reczek-7b2816230/', githubUrl: 'https://github.com/adziu1234'},
  {imgUrl: AA, name: 'Anthony Al-Rifai', title: 'Software Engineer', linkedInUrl: 'https://www.linkedin.com/in/anthony-al-rifai-31677a100/', githubUrl: 'https://github.com/AnthonyAl-Rifai'},
  {imgUrl: SG, name: 'Santiago Gil Maya', title: 'Software Engineer', linkedInUrl: 'https://www.linkedin.com/in/santiago-gil-929721121//', githubUrl: 'https://github.com/santiago-gil'},
  {imgUrl: KW, name: 'Kevin Wang', title: 'Software Engineer', linkedInUrl: 'https://www.linkedin.com/in/kevin-w-b841b13/', githubUrl: 'https://github.com/kwang929'},
];


export default function Contributors(){

  const profiles = [];
  let i = 0;
  for (const prof of profileList){
    profiles.push(<Profile props={prof} key={`contributor${i}`} />)
    i += 1;
  }

  return (
    <div className="container my-24 px-6 mx-auto contributors">
      <section className="mb-32 text-gray-800 text-center">
        <h2 className="text-3xl font-bold mb-32 team-header text-gray-900 dark:text-[#f8f4eb]">Meet the dbSpy Team</h2>
        <div className="flex flex-row flex-wrap justify-around">
        {profiles}
        </div>
      </section>
    </div>
  )
  
}
