import { useState, useEffect } from 'react';
import { useExternalScript } from '../hooks/useExternalScript';
import { AssessWithScriptLoaded } from '../components/AssessWithScriptLoaded';
import LoadSpinner from '../components/LoadRetrySpinner';
import Delayed from '../components/Delayed';
import '../style/App.css';

const Assess = () => {

  const [itemAPI, setItemAPI] = useState(null);

  useEffect(() => {

    if(!itemAPI){

      const callLearnosityAPI = async () => {
        const response = await fetch('.netlify/functions/quiz-loader')
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

  const learnosityScript = 'https://items.learnosity.com/?v2022.3.LTS';
  const status = useExternalScript(learnosityScript, authenticated.request);

  return (
    <>
      <div>
        {status === 'loading' && <LoadSpinner />}
        {status === 'ready' && <AssessWithScriptLoaded />}
      </div>
    </>
  )
}

export default Assess;
