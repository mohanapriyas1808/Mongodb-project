import React, { useEffect, useState } from 'react';

function App() {
    const [votes, setVotes] = useState({ python: 0, c: 0, java: 0 });

    useEffect(() => {
        const fetchVotes = async () => {
            try {
                // Use the backend service name defined in docker-compose.yml
                const response = await fetch('http://localhost:5000/votes'); // Use service name
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Fetched Votes:', data); // Debugging line
                const voteData = data.reduce((acc, vote) => {
                    acc[vote.language] = vote.count;
                    return acc;
                }, {});
                setVotes(voteData);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchVotes();
    }, []);

    const handleVote = async (language) => {
        try {
            const response = await fetch('http://localhost:5000/votes', { // Use service name
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ language }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const updatedVote = await response.json();
            console.log('Updated Vote:', updatedVote); // Debugging line
            setVotes((prevVotes) => ({ ...prevVotes, [language]: updatedVote.count }));
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    return (
        <div className="App">
            <h1>Vote for Your Favorite Programming Language</h1>
            <div>
                <button onClick={() => handleVote('python')}>Vote for Python</button>
                <p>Python: {votes.python || 0}</p>
            </div>
            <div>
                <button onClick={() => handleVote('c')}>Vote for C</button>
                <p>C: {votes.c || 0}</p>
            </div>
            <div>
                <button onClick={() => handleVote('java')}>Vote for Java</button>
                <p>Java: {votes.java || 0}</p>
            </div>
        </div>
    );
}

export default App;
