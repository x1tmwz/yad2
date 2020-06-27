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
        <div className="flexResponsive abs">
            <CustomField
                label={props.fromLabel}
                component={
                    <CustomSelect
                        name={props.name}
                        defaultOption={props.fromOption === 0 ?props.defaultOption:props.fromOption}
                        options={props.options}
                        optionsNames={props.optionsNames}
                        getOption={props.getOptionFrom}
                        className={props.classNameFrom}
                    />
                }
            />
            <CustomField
                label={props.toLabel}
                component={
                    <CustomSelect
                        name={props.name}
                        defaultOption={props.toOption === 0 ?props.defaultOption:props.toOption}
                        options={props.options.slice(findFromIndex(props.from))}
                        optionsNames={props.optionsNames.slice(findFromIndex(props.from))}
                        getOption={props.getOptionTo}
                        className={props.classNameTo}
                    />
                }
            />



        </div>
    );
}
export default SelectFromTo;