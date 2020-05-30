import React from 'react';
import CustomSelect from './CustomSelect';
import CustomField from './CustomField';


const SelectFromTo = (props) => {
    const findFromIndex = (from) => {
        if (from) {
            return props.options.findIndex((item) => item === parseFloat(from));
        }
        return 0;
    }
    return (
        <div className="d-flex flex-column">
            <CustomField
                label={props.fromLabel}
                component={
                    <CustomSelect
                        name={props.name}
                        defaultOption={props.defaultOption}
                        options={props.options}
                        optionsNames={props.optionsNames}
                        getOption={props.getOptionFrom}
                    />
                }
            />
            <CustomField
                label={props.toLabel}
                component={
                    <CustomSelect
                        name={props.name}
                        defaultOption={props.defaultOption}
                        options={props.options.slice(findFromIndex(props.from))}
                        optionsNames={props.optionsNames.slice(findFromIndex(props.from))}
                        getOption={props.getOptionTo}
                    />
                }
            />



        </div>
    );
}
export default SelectFromTo;