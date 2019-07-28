import * as React from 'react';

interface IProps {
    onClick: () => void
}

export class Button extends React.Component<IProps, {}> {
    render() {
        const { children } = this.props
        return (
            <button>{ children }</button>
        )
    }
}
