import React from 'react';
import { WeavyClient, WeavyProvider, Chat } from '@weavy/uikit-react';
import "@weavy/uikit-react/dist/css/weavy.css";

const weavyClient = new WeavyClient({
    url: "https://6c4406765dbc4323974bdd9c9ee2f636.weavy.io",
    tokenFactory: async () => "wyu_R1ov77mlLc3m27hJpXCYa3xtjJ37p20lPGfZ"
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