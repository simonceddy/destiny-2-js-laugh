// app.getManifest()
//   .then((res) => {
//     if (res.Response) {
//       return storeJsonFile('./storage/manifest.json', res.Response);
//     }
//     return false;
//   })
//   .then(confirmStored)
//   .catch(console.error);
// app.searchDestinyPlayer(-1, 'Jenova#2003')
//   .then((res) => {
//     const player = res.Response;
//     if (player) {
//       return storePlayersData([
//         ...Object.values(getAllPlayers()),
//         ...player
//       ]);
//     }
//     return false;
//   })
//   .then(confirmStored)
//   .catch((err) => {
//     console.error(`searchPlayer Error: ${err}`);
//   });
