<?php

class FridayThirteenCounter
{
  private int $birthYear;

  private int $birthMonth;

  private int $endYear;

  public function __construct(int $birthYear, int $birthMonth, int $endYear = 0)
  {
    $this->birthYear = $birthYear;
    $this->birthMonth = $birthMonth;
    $this->endYear = $endYear;
  }

  public function amount() {
    return count($this->calculate());
  }

  private function calculate() {
    $now = new DateTime('NOW');
    $end = $this->endYear > 0 ? $this->endYear : (int)$now->format('Y');
    $birthYear = $this->birthYear;
    $res = [];
    while ($birthYear <= $end) {
      $dateString = "{$birthYear}-{$this->birthMonth}-13";
      $dateObj = new DateTime($dateString);
      if ($dateObj->format('D') === 'Fri') {
        array_push($res, $dateObj);
      }
      $birthYear += 1;
    }

    return $res;
  }
}
