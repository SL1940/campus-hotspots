const buttons = document.querySelectorAll(".place-button");
const places = document.querySelectorAll(".place");
const map = document.querySelector("#map");

buttons.forEach(button => {
    button.addEventListener("click", () => {

        const placeId = button.dataset.place;
        const mapUrl = button.dataset.map;

        // 모든 장소 숨기기
        places.forEach(place => {
            place.hidden = true;
        });

        // 선택한 장소 보이기
        const selectedPlace = document.querySelector(`#${placeId}`);
        selectedPlace.hidden = false;

        // 지도 변경
        if (mapUrl) {
            map.src = mapUrl;
        }
    });
});