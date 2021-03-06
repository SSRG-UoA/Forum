<?php

class HorizontalRadioBox extends RadioBox {
    
    function HorizontalRadioBox($id, $name, $value, $options, $validations=VALIDATE_NOTHING){
        parent::RadioBox($id, $name, $value, $options, $validations);
    }
    
    function render(){
        $html = "";
        foreach($this->options as $option){
            $checked = "";
            if($this->value == $option){
                $checked = " checked";
            }
            $html .= "<input type='radio' {$this->renderAttr()} name='{$this->id}' value='{$option}' $checked/>{$option}&nbsp;&nbsp;&nbsp;&nbsp;";
        }
        return $html;
    }
    
}


?>
