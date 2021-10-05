<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

function getPageText($siteLink)
{
    $textPage = file_get_contents($siteLink);
    $textPage = preg_replace("/<style(.*)<\/style>/iUs", "", $textPage);
    $textPage = preg_replace("/<script(.*)<\/script>/iUs", "", $textPage);
    $textPage = preg_replace("(<[^<>]+>)", ' ', $textPage);
    return $textPage;
}

function getWordsInText($text)
{
    $oldWordsPage = explode(' ', $text);
    $oldWordsPage = array_unique($oldWordsPage);
    $newWordsPage = [];

    foreach ($oldWordsPage as $word) {
        for ($i = 0; $i < mb_strlen($word); $i++) {
            if (preg_match("/^[a-zа-яA-ZА-ЯёЁ]/u", mb_substr($word, $i, 1))) {
                $newWordsPage[] = $word;
                break;
            }
        }
    }
    return $newWordsPage;
}

function getUncorrectWord($words)
{
    $textForCheck = 'text=' . implode('&text=', $words);
    $opts = [
        'http' =>
        [
            'method'  => 'POST',
            'header'  => "Content-type:application/x-www-form-urlencoded;",
            'content' => $textForCheck,
        ]
    ];

    $context  = stream_context_create($opts);
    $url = 'https://speller.yandex.net/services/spellservice.json/checkTexts';
    $result = file_get_contents($url, false, $context);

    $answer = json_decode($result, true);
    $b = array_filter($answer, 'getNotEmpty');
    return $b;
}

function getNotEmpty($mas)
{
    return count($mas) != 0;
}

function file_contents_exist($url)
{
    $response_code = 200;
    @$headers = get_headers($url);

    if (@substr($headers[0], 9, 3) == $response_code) {
        return TRUE;
    } else {
        return FALSE;
    }
}

$url = $_GET['siteLink'];

if (!file_contents_exist($url)) {
    echo json_encode(['error']);
    exit;
}

$textPage = getPageText($url);

$words = getWordsInText($textPage);
$uncorrectWords = getUncorrectWord($words);

$response = [];
foreach ($uncorrectWords as $uncorrectWord) {
    $response[] = [$uncorrectWord[0]['word'], implode(', ', $uncorrectWord[0]['s'])];
}
echo json_encode($response);
