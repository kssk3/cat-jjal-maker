const EMPTY_HEART = "🤍";
const FULL_HEART = "💖";

const CAT1 = "https://cataas.com/cat/HSENVDU4ZMqy7KQ0/says/react";
const CAT2 = "https://cataas.com/cat/BxqL2EjFmtxDkAm2/says/inflearn";
const CAT3 = "https://cataas.com/cat/18MD6byVC1yKGpXp/says/JavaScript";

const includesHangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test(text);

const jsonLocalStorage = {
    setItem: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    },
    getItem: (key) => {
        return JSON.parse(localStorage.getItem(key));
    },
};

const fetchCat = async (text) => {
    const OPEN_API_DOMAIN = "https://cataas.com";
    const response = await fetch(
        `${OPEN_API_DOMAIN}/cat/says/${text}?json=true`,
    );
    const responseJson = await response.json();
    return `${OPEN_API_DOMAIN}/cat/${responseJson.id}/says/${text}`; // NOTE: API 스펙 변경으로 강의 영상과 다른 URL로 변경했습니다.
};
