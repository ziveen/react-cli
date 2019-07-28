import * as React from 'react';
import { storiesOf } from "@storybook/react";
import { action } from '@storybook/addon-actions';
import { Button } from './Button.stories';

const stories = storiesOf('Components', module);

stories
    .add('with text', () => (
        <Button onClick={action('click')}>Hello Button</Button>
    ))