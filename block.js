import {registerBlockType} from '@wordpress/blocks';
import {createElement, useEffect, useRef} from '@wordpress/element';

registerBlockType('cimi-wage-simulator/simulator-block', {
    title: 'Wage Simulator',
    category: 'widgets',
    edit: ({attributes, setAttributes}) => {
        const blockRef = useRef(null);

        useEffect(() => {
            const root = blockRef.current;
            const simulator = document.createElement('div');
            simulator.id = 'cimi-simulator-root';
            root.appendChild(simulator);

            return () => {
                root.removeChild(simulator);
            };
        }, []);

        return createElement('div', {ref: blockRef});
    },
    save: () => {
        return null;
    },
})