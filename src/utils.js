import { loadYmap } from "vue-yandex-maps";

export default async function getGlobalYandexMapVar() {
    await loadYmap({
        apiKey: "30bb15aa-73af-4d6c-a8f2-89c1d2ec8967",
        lang: "ru_RU",
        coordorder: "latlong",
        enterprise: false,
        version: "2.1",
    });
}