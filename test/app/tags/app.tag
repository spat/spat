<app class='p16'>
  <h1>{ title }</h1>

  <div class='p16'>
    <div class='s64 bg-red'></div>
  </div>

  <ul class='ml32'>
    <li>isNode: {isNode}</li>
    <li>isBrowser: {isBrowser}</li>
    <li each='{item in [1, 2, 3, 4]}' item='{item}'>
      {item} aaa bbb ccc
    </li>
  </ul>

  <div>
    <img src='/images/kenkyo.png' />
  </div>

  <script>
    this.title = 'Hello, spalate with parcel!';
    // console.log(Firestore);
  </script>
</app>



