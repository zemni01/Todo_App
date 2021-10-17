import React, { useState } from "react";

const Form = ({ addTodo}) => {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        if (inputValue.trim() === "") return;
        addTodo({ title: inputValue, completed: false});
        setInputValue('');
    };

    return (
        <form className='ui form' onSubmit={handleFormSubmit}>
            <div className='ui grid center aligned'>
                <div className='row'>
                    <div className="column five wide">
                    <input 
                        value={inputValue}
                        onChange={handleInputChange}
                        type="text" 
                        placeholder='enter something to do...' 
                    />
                    </div>
                    <div className="column one wide">
                    <button type='submit' className="ui button circular icon green"><i className="plus icon white"></i></button>
                    </div>
                    
                </div>
            </div>
        </form>
    );
};

export default Form;