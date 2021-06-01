import React from 'react';

interface Iname {
    name: string
}

export const Workspace: React.FC<Iname> = ({name}) => {
    return(
        <div>{name}</div>
    )
}