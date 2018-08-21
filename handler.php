<?php
// Название берём от аттрибута name='' в разметке формы

$numberInput = $_POST['numberInput'];

// Пишем тут без квадратных скобок: []
$selectImageList = getListValues($_POST['selectImage']);

$selectOneImage = $_POST['selectOneImage'];

$simpleText = $_POST['simpleText'];

$multiChoiceList = getListValues($_POST['multipleChoice']);

$oneChoice = $_POST['oneChoice'];

$dropdownSelect = $_POST['dropdownSelect'];

$email = $_POST['email'];

$message = "Ответ на вопрос 1: " . $numberInput . "\n";
$message .= "Ответ на вопрос 2: " . $selectImageList . "\n";
$message .= "Ответ на вопрос 3: " . $selectOneImage . "\n";
$message .= "Ответ на вопрос 4: " . $simpleText . "\n";
$message .= "Ответ на вопрос 5: " . $multiChoiceList . "\n";
$message .= "Ответ на вопрос 6: " . $oneChoice . "\n";
$message .= "Ответ на вопрос 7: " . $dropdownSelect . "\n";
$message .= "Ответ на вопрос 8: " . $email . "\n";

/**
 * Данная функция смотрит данные формы список, и если да
 * то все значения склеиваются с помощью запятых
 */
function getListValues($postArgument)
{
    if (isset($postArgument) && is_array($postArgument)) {
        return implode(', ', $postArgument);
    } else {
        return $postArgument;
    }
}
echo $message; // Само сообщение храниться тут
exit(); // можно удалить этот кусок кода если скрипт должен идти дальше
