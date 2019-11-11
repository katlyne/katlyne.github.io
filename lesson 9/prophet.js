const requestURL = 'https://byui-cit230.github.io/lessons/lesson-09/data/latter-day-prophets.json';
fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {
            console.table(jsonObject); // temporary checking for valid response and data parsing
            for (let i = 0; i < prophets.length; i++) {
                let card = document.createElement('section');
                let h2 = document.createElement('h2');

                h2.textContent = prophets[i].name + ' ' + prophets[i].lastname;

                card.appendChild(h2);

                document.querySelector('div.cards').appendChild(card);
            });
        const prophets = jsonObject['prophets'];
        image.setAttribute('src', prophets[i].imageurl);



        {
            "prophets": [{
                "name": "Joseph",
                "lastname": "Smith",
                "birthdate": "23 December 1805",
                "death": "27 June 1844",
                "length": 14,
                "order": 1,
                "birthplace": "Vermont",
                "numofchildren": 11,
                "imageurl": "https://media.ldscdn.org/images/media-library/gospel-art/church-history/joseph-smith-art-lds-37715-gallery.jpg"
              },
              {
                "name": "Brigham",
                "lastname": "Young",
                "birthdate": "01 June 1801",
                "death": "29 August 1877",
                "length": 30,
                "order": 2,
                "birthplace": "Vermont",
                "numofchildren": 56,
                "imageurl": "https://media.ldscdn.org/images/media-library/gospel-art/latter-day-prophets/brigham-young-82908-gallery.jpg"
              },
              {
                "name": "John",
                "lastname": "Taylor",
                "birthdate": "01 November 1808",
                "death": "25 July 1887",
                "length": 6,
                "order": 3,
                "birthplace": "England",
                "numofchildren": 34,
                "imageurl": "https://media.ldscdn.org/images/media-library/gospel-art/latter-day-prophets/john-taylor-82909-gallery.jpg"
              },
              {
                "name": "Wilford",
                "lastname": "Woodruff",
                "birthdate": "01 March 1807",
                "death": "02 September 1898",
                "length": 9,
                "order": 4,
                "birthplace": "Connecticut",
                "numofchildren": 34,
                "imageurl": "https://media.ldscdn.org/images/media-library/gospel-art/latter-day-prophets/wilford-woodruff-82910-gallery.jpg"
              },
              {
                "name": "Lorenzo",
                "lastname": "Snow",
                "birthdate": "03 April 1814",
                "death": "19 October 1901",
                "length": 3,
                "order": 5,
                "birthplace": "Ohio",
                "numofchildren": 42,
                "imageurl": "https://media.ldscdn.org/images/media-library/gospel-art/latter-day-prophets/lorenzo-snow-82911-gallery.jpg"
              },
              {
                "name": "Joseph F.",
                "lastname": "Smith",
                "birthdate": "12 November 1838",
                "death": "19 November 1918",
                "length": 17,
                "order": 6,
                "birthplace": "Missouri",
                "numofchildren": 48,
                "imageurl": "https://media.ldscdn.org/images/media-library/gospel-art/latter-day-prophets/joseph-f-smith-82912-gallery.jpg"
              },
              {
                "name": "Heber J.",
                "lastname": "Grant",
                "birthdate": "22 November 1856",
                "death": "14 May 1945",
                "length": 23,
                "order": 7,
                "birthplace": "Utah",
                "numofchildren": 12,
                "imageurl": "https://media.ldscdn.org/images/media-library/gospel-art/latter-day-prophets/heber-j-grant-82913-gallery.jpg"
              },
              {
                "name": "George A.",
                "lastname": "Smith",
                "birthdate": "4 April 1870",
                "death": "4 April 1951",
                "length": 6,
                "order": 8,
                "birthplace": "Utah",
                "numofchildren": 3,
                "imageurl": "https://media.ldscdn.org/images/media-library/gospel-art/latter-day-prophets/george-albert-smith-82914-gallery.jpg"
              },
              {
                "name": "David O.",
                "lastname": "McKay",
                "birthdate": "8 September 1873",
                "death": "18 January 1970",
                "length": 19,
                "order": 9,
                "birthplace": "Utah",
                "numofchildren": 7,
                "imageurl": "https://media.ldscdn.org/images/media-library/gospel-art/latter-day-prophets/david-o-mckay-82915-gallery.jpg"
              },
              {
                "name": "Joseph Fielding",
                "lastname": "Smith",
                "birthdate": "19 July 1876",
                "death": "2 July 1972",
                "length": 1,
                "order": 10,
                "birthplace": "Utah",
                "numofchildren": 11,
                "imageurl": "https://media.ldscdn.org/images/media-library/teachings-of-presidents-of-the-church/joseph-fielding-smith/joseph-fielding-smith-82916-gallery.jpg"
              },
              {
                "name": "Harold B.",
                "lastname": "Lee",
                "birthdate": "28 March 1899",
                "death": "26 December 1973",
                "length": 1,
                "order": 11,
                "birthplace": "Idaho",
                "numofchildren": 2,
                "imageurl": "https://media.ldscdn.org/images/media-library/gospel-art/latter-day-prophets/harold-b-lee-37763-gallery.jpg"
              },
              {
                "name": "Spencer W.",
                "lastname": "Kimball",
                "birthdate": "28 March 1895",
                "death": "5 November 1985",
                "length": 12,
                "order": 12,
                "birthplace": "Utah",
                "numofchildren": 4,
                "imageurl": "https://media.ldscdn.org/images/media-library/gospel-art/latter-day-prophets/spencer-w-kimball-82918-gallery.jpg"
              },
              {
                "name": "Ezra Taft",
                "lastname": "Benson",
                "birthdate": "4 August 1899",
                "death": "30 May 1994",
                "length": 9,
                "order": 13,
                "birthplace": "Idaho",
                "numofchildren": 6,
                "imageurl": "https://media.ldscdn.org/images/media-library/gospel-art/latter-day-prophets/lds-president-ezra-taft-benson-83244-gallery.jpg"
              },
              {
                "name": "Howard W.",
                "lastname": "Hunter",
                "birthdate": "14 November 1907",
                "death": "3 March 1995",
                "length": 1,
                "order": 14,
                "birthplace": "Idaho",
                "numofchildren": 3,
                "imageurl": "https://media.ldscdn.org/images/media-library/gospel-art/latter-day-prophets/lds-president-howard-w-hunter-83247-gallery-notice.jpg"
              },
              {
                "name": "Gordon B.",
                "lastname": "Hinckley",
                "birthdate": "23 June 1910",
                "death": "27 January 2008",
                "length": 13,
                "order": 15,
                "birthplace": "Utah",
                "numofchildren": 5,
                "imageurl": "https://media.ldscdn.org/images/media-library/gospel-art/latter-day-prophets/lds-president-gordon-b-hinckley-83335-gallery.jpg"
              },
              {
                "name": "Thomas S.",
                "lastname": "Monson",
                "birthdate": "21 August 1927",
                "death": "2 January 2018",
                "length": 10,
                "order": 16,
                "birthplace": "Utah",
                "numofchildren": 3,
                "imageurl": "https://media.ldscdn.org/images/media-library/church-leadership/first-presidency-and-quorum-of-the-twelve-apostles/president-thomas-s-monson-lds-560823-gallery.jpg"
              },
              {
                "name": "Russell M.",
                "lastname": "Nelson",
                "birthdate": "9 September 1924",
                "death": null,
                "length": 2,
                "order": 17,
                "birthplace": "Utah",
                "numofchildren": 10,
                "imageurl": "https://photos.thechurchnews.com/file/52b8de3202/dnews/galleryImageLarge/elder-russell-m-nelson.jpg"
              }
            ]
          }