import { useState, useEffect } from 'react';
import { useExternalScript } from '../hooks/useExternalScript';
import { AssessWithScriptLoaded } from '../components/AssessWithScriptLoaded';
import '../style/App.css';

const Assess = () => {

  const [itemAPI, setItemAPI] = useState(null);

  useEffect(() => {

    console.log('location = ',location.hostname);

    if(!itemAPI){

      const callLearnosityAPI = async () => {
        const response = await fetch('../.netlify/functions/quiz-loader')
            .then(response => response.json());
        const body = response;
        if (!response) {
          throw Error(body.message)
        }
        setItemAPI(body);
      }

      callLearnosityAPI()
        .catch(console.error);
    }

  }, [itemAPI]);

  let authenticated = {};

  if (itemAPI) {
    authenticated = itemAPI;
  }

  const learnosityScript = 'https://items.learnosity.com/?v2022.1.LTS';
  const status = useExternalScript(learnosityScript, authenticated.request);

  return (
    <>
      <div>
        {status === 'loading' && <p> loading... </p>}
        {status === 'ready' && <AssessWithScriptLoaded />}
      </div>
    </>
  )
}

export default Assess;
