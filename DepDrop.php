<?php
/**
 * Created by PhpStorm.
 * User: zrk4939
 * Date: 22.11.2017
 * Time: 16:19
 */

namespace zrk4939\widgets\depdrop;


use zrk4939\widgets\depdrop\assets\DepDropAsset;
use yii\helpers\Html;
use yii\helpers\Json;
use yii\widgets\InputWidget;

class DepDrop extends InputWidget
{
    public $depends = [];
    public $url;
    public $placeholder = 'Выбрать из списка';

    public function run()
    {
        DepDropAsset::register($this->view);

        $selector = Html::getInputId($this->model, $this->attribute);
        $varName = 'depdrop_' . $this->getId();
        $depends = Json::encode($this->depends);

        echo Html::activeHiddenInput($this->model, $this->attribute, ['value' => '', 'id' => '']);
        echo Html::activeDropDownList($this->model, $this->attribute, [], ['class' => 'form-control', 'prompt' => $this->placeholder]);

        $script = <<<JS
        var {$varName} = new depDrop("{$selector}", {$depends}, "{$this->url}");
        {$varName}.init();
JS;
        $this->view->registerJs($script);
    }
}
