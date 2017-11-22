# yii2-plupload

A Dependent DropDown widget for the Yii2 framework

## Installation

add

```
"zrk4939/yii2-depdrop": "@dev"
```
to the require section of your `composer.json` file.

and

```
{
    "type": "vcs",
    "url": "https://github.com/zrk4939/yii2-depdrop.git"
}
```
to the repositories array of your `composer.json` file.

## Usage

### Widget

```php
<?php
echo $form->field($model, 'attribute')->widget(\zrk4939\widgets\depdrop\DepDrop::className(), [
    'placeholder' => 'Выбрать из списка...',
    'depends' => ['id-dependent-field'],
    'url' => \yii\helpers\Url::to(['/ajax/get', 'selected' => $model->getAttribute('attribute')]),
])
?>
```

### Controller

```php
<?php
public function actionGet()
{
    Yii::$app->response->format = Response::FORMAT_JSON;
    
    $result = [
        'output' => [],
        'selected' => Yii::$app->request->get('selected')
    ];
    
    if (Yii::$app->request->isPost) {
        $post = Yii::$app->request->post('depdrop_all_params');
        $query = SomeModel::find()
                ->andWhere(['attribute' => $post['attribute']]);
        
        foreach ($query->all() as $model) {
            $result['output'][] = [
                'id' => $model->getAttribute('id'),
                'name' => $model->getAttribute('name'),
            ];
        }
    }
    
    return $result;
}
?>
```