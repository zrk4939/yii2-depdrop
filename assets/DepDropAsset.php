<?php
/**
 * Created by PhpStorm.
 * User: zrk4939
 * Date: 22.11.2017
 * Time: 16:20
 */

namespace zrk4939\widgets\depdrop\assets;


use yii\web\AssetBundle;

class DepDropAsset extends AssetBundle
{
    public $sourcePath = '@domain/widgets/depdrop/assets/dist';

    public $js = [
        'depdrop_plugin.js'
    ];

    public $depends = [
        'yii\web\YiiAsset',
    ];
}