# Simple-Decard-Reader

## Scripts

- npm run start : 會自動開啟開發環境的網頁。
- npm run build : 會在 dist 資料夾中，建置正式環境的靜態檔案。

## Feature

- 透過打 Decard 提供的 API 製作一個擁有 infinite scroll 的簡單文章列表。

## Designs

- 流程

  1. 一進頁面會先打第一次的 API 取得首筆文章陣列
  2. 每當新的文章陣列資料回來時，會做兩件事
     1. 更新文章列表，並且會先篩掉重複 id 的文章
     2. 更新下次要打 API 的 url，將 before 的 query 換成新陣列的最後一筆資料的 id
  3. 每當往下滑動到距離底部 100px 時，就會再次觸發 API，獲取新的文章陣列資料，在取得資料期間，無法重複打 API

- 封裝 useLazyFetch：將每次打 API 都需要處理的 `isLoading`、`isError`、`data` state 封裝在一起，並利用 `useReducer` 控管多個 state 同時的更新，未來若有需要打 API 就可以使用或擴充這個 custom hook

- 封裝 useInfiniteScroll：將 infinite scroll 相關的 state 和流程，封裝其中，如有需要就可以重複使用，未來若有需要使用 infinite scroll 就可以使用或擴充這個 custom hook

## Other

- infinite scroll 的最底部：如果能與後端端協調，得知總共有比幾資料或是每次都一定會固定回來的數量，就有辦法判斷何時已無更多資料，就能設計 `hasMore` 傳入 `useInfiniteScroll` 阻止多餘的 fetch

- 重複的 id 資料問題：雖然目前是在前端篩選掉，但可行的狀況下，會與後端討論是否能由後端統一在排序或某些遍歷資料時就一起處理

- Error 的處理：
  1. 使用者端：需要與 UIUX、PO 等角色討論協調，決定各種 Error 在使用者端的呈現
  2. 維運端：需要將重要的資料 log 進監控系統中，藉此能讓工程師有辦法查找問題，甚至更早發現線上問題
