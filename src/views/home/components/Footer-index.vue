<template>
  <div class="footer">
    <div class="footer-width">
      <div class="footer-page">
        <h3>關於我們</h3>
        <nav>
          <a href="#" id="">公司簡介</a>
          <a href="#" id="">菁英招募</a>
          <a href="#" id="">聯絡我們</a>
        </nav>
      </div>
      <div class="footer-page">
        <h3>旅客服務</h3>
        <nav>
          <a href="#" id="">護照簽證</a>
          <a href="#" id="">Wifi租借</a>
          <a href="#" id="">翻譯機/耳機</a>
          <a href="#" id="">旅遊攻略</a>
        </nav>
      </div>
      <div class="footer-page">
        <h3>訂購須知</h3>
        <nav>
          <a href="#" id="">常見問題</a>
          <a href="#" id="">訂購說明</a>
          <a href="#" id="">電子收據公告</a>
          <a href="#" id="">隱私權政策</a>
          <a href="#" id="">交易安全</a>
        </nav>
      </div>
      <div class="footer-page">
        <h3>開發人員專用</h3>
        <nav>
          <a href="/admin-EnterData" id="">開發人員</a>
        </nav>
      </div>
    </div>
  </div>
  <div class="footer-button">
    此網頁僅供作品集使用，©2001-2023 隱私權政策 版權所有© Wowprime.Corp. All
    rights reserved.
  </div>
</template>

<style lang="scss" scoped>
.footer {
  width: 100vw;
  min-width: 1200px;
  background-color: rgb(172, 172, 172);
  @include phone {
    min-width: 400px;
  }
}
.footer-width {
  width: 1200px;
  display: flex;
  margin: auto;
  box-sizing: border-box;
  @include phone {
    width: 100vw;
  }
}

.footer-page {
  width: 100%;
  margin: 10px;
}
.footer-page h3 {
  color: aliceblue;
  margin-bottom: 10px;
  border-bottom: 1px solid white;
}
.footer-page nav a {
  display: block;
  color: antiquewhite;
  text-decoration: none;
}
.footer-button {
  width: 100vw;
  height: 70px;
  line-height: 70px;
  text-align: center;
  color: aliceblue;
  background-color: rgb(125, 125, 125);
}
</style>
