const categories = { "results": [{ "id": 484, "title": "Cleaning", "total_time": 10141 }, { "id": 574, "title": "Coding", "total_time": null }, { "id": 584, "title": "Work", "total_time": null }] };

const logs = { "results": [{ "id": 64, "category_id": 484, "time": 99, "finished_date": "2022-08-26T18:02:00.000Z" }, { "id": 74, "category_id": 484, "time": 10009, "finished_date": "2022-08-26T18:02:00.000Z" }, { "id": 84, "category_id": 484, "time": 33, "finished_date": "2022-08-26T18:02:00.000Z" }] };

const singleLog = { "results": [{ "id": 64, "category_id": 484, "time": 99, "finished_date": "2022-08-26T18:02:00.000Z" }] };

const singleCategory = { "results": [{ "id": 484, "title": "Cleaning" }] };

const categoryLogs = { "results": [{ "category": "Cleaning", "category_id": 484, "log_id": 64, "time": 99, "finished_date": "2022-08-26T18:02:00.000Z" }, { "category": "Cleaning", "category_id": 484, "log_id": 74, "time": 10009, "finished_date": "2022-08-26T18:02:00.000Z" }, { "category": "Cleaning", "category_id": 484, "log_id": 84, "time": 33, "finished_date": "2022-08-26T18:02:00.000Z" }] };

export default {
  categories,
  categoryLogs,
  logs,
  singleCategory,
  singleLog,
};
