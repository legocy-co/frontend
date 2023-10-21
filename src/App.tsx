import React from 'react';
import { WeavyClient, WeavyProvider, Chat } from '@weavy/uikit-react';

const weavyClient = new WeavyClient({
    url: "https://6c4406765dbc4323974bdd9c9ee2f636.weavy.io",
    tokenFactory: async () => "wyu_gOis5vBqiDAix29sOtwINugDSWOYOe3THOPu"
});

function App() {
    return (
        <div className="App">
            <WeavyProvider client={weavyClient}>
                <Chat uid="demochat" />
            </WeavyProvider>
        </div>
    )
}

export default App;