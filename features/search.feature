Feature: Ticket booking app tests
    Scenario: Successful booking of one seat
        Given user is on "/index.php" page
        When user selects date
        When user selects session
        When user selects 5th row 5th place
        When user reserves a seat
        Then user sees "Вы выбрали билеты"
    Scenario: Successful booking of three seat
        Given user is on "/index.php" page
        When user selects date
        When user selects session Mickey mouse
        When user selects 4th row 3th place
        When user selects 4th row 6th place
        When user selects 4th row 7th place
        When user reserves a seat
        Then user see "Приятного просмотра!"
    Scenario: Reservation of a occupied seat
        Given user is on "/index.php" page
        When user selects date
        When user selects session Mickey mouse
        When user selects 9th row 2th place
        Then user sees an inactive Book button
        
