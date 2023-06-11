import React, { createContext, useState } from 'react';

const LogContext = createContext({
    logs: [],
    setLogs: () => {},
});

export const LogProvider = ({ children }) => {
    const [logs, setLogs] = useState([]);
    const [pomoCount, setPomoCount] = useState(0);

    return (
        <LogContext.Provider value={{ logs, setLogs, pomoCount, setPomoCount }}>
        {children}
        </LogContext.Provider>
    );
};

export default LogContext;
