import React, { createContext, useState } from 'react';

const LogContext = createContext({
    logs: [],
    setLogs: () => {},
});

export const LogProvider = ({ children }) => {
    const [logs, setLogs] = useState([]);
    const [pomoCompletedCount, setPomoCompletedCount] = useState(0);

    return (
        <LogContext.Provider value={{ logs, setLogs, pomoCompletedCount, setPomoCompletedCount }}>
        {children}
        </LogContext.Provider>
    );
};

export default LogContext;
