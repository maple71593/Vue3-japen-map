<script setup>
import FakeHeader from '@/components/Fake-Header.vue'
// import { ref } from 'vue'
//取得本地資訊圖片(資料留存參考已改axios取得資料)
// const changeIMG = (url) => {
//   const src = new URL(`/public/list-1/${url}`, import.meta.url).href
//   console.log(src)
//   return src
// }
// const pag1 = changeIMG('jcr_content.jpg')
</script>
<template>
  <div>
    <FakeHeader></FakeHeader>
    <div class="list-1-title">
      【鉑金會】富士森風FUFU河口湖．東京寶格麗璀璨夜五日
    </div>
    <!-- 第一個 -->
    <div class="scss-test-box1">
      <div>
        <div>
          <div>
            <img
              src="../../../public/list-1/321-26-min.png"
              style="width: 10vw"
              alt=""
            />
          </div>
          <div>
            <h2>義精緻、法優雅與日柔粹美學交鋒</h2>
            <h2>三大酒店品牌</h2>
            <h2>共譜人文與自然瑰麗棲居</h2>
          </div>
        </div>
      </div>
    </div>
    <video
      src="../../../public/list-1/bulgari-hotel-tokyo-transcode.mp4"
      style="width: 100vw; height: 100%; margin:"
      autoplay
    ></video>
    <!-- 第二個 -->
    <div class="scss-test-box2">
      <div>
        <div>
          <div>
            <img src="../../../public/list-1/資產-4-min.png" alt="" />
          </div>
          <div>
            <h2>東京 寶格麗</h2>
          </div>
        </div>
      </div>
    </div>
    <!-- 第三個 -->
    <div class="scss-test-box3">
      <div>
        <div>
          <img src="../../../public/list-1/box3-1.png" alt="" />
          <img src="../../../public/list-1/box3-2.png" alt="" />
        </div>
        <div>
          <img src="../../../public/list-1/box3-3.png" alt="" />
          <img src="../../../public/list-1/box3-4.png" alt="" />
          <p>義大利珠寶品牌寶格麗旗下飯店</p>
          <p>蟄居東京八重洲區黃金地段</p>
          <p>超高層俯瞰百年皇居、晴空塔</p>
        </div>
        <div>
          <p>深湛鑲金工藝，經典橘與富士山貫連設計</p>
          <p>墨黑花崗岩、溫潤榆木牆尊貴迎賓</p>
          <p>米三星日義餐廳，雙雙締造舌尖非凡體驗</p>
          <img src="../../../public/list-1/box3-5.png" alt="" />
        </div>
      </div>
    </div>
    <!-- 第四個 -->
    <div class="scss-test-box4">
      <div>
        <div>
          <img src="../../../public/list-1/box4-1.png" alt="" />
        </div>
        <div>
          <img src="../../../public/list-1/box4-2.png" alt="" />
          <h1>客房 東京鎏金夜</h1>
          <div></div>
          <p>米蘭首屈一指建築團隊ACPV操刀</p>
          <p>8房型、98間房揉合羅馬與東京氣質</p>
          <p>Maxalto桌、Flexform扶手椅等</p>
          <p>義大利精品家具</p>
          <p>體現寶格麗當代設計、卓越工藝與細膩巧思</p>
        </div>
        <div>
          <img src="../../../public/list-1/box4-3.png" alt="" />
        </div>
      </div>
    </div>
    <!-- 第五個 -->
    <div class="scss-test-box5">
      <div>
        <div><img src="../../../public/list-1/box5-1.png" alt="" /></div>
        <div><img src="../../../public/list-1/box5-2.png" alt="" /></div>
        <div>
          <img src="../../../public/list-1/box5-3.png" alt="" />
          <p>魔幻日落，做一段微醺悠長的夢</p>
          <p>在馬賽克手工磁磚</p>
          <p>吧台「奇蹟花園」前小酌</p>
          <p>天晴可眺望富士皚雪芙蓉底</p>
        </div>
      </div>
    </div>
    <!-- 第六個 -->
    <div class="scss-test-box6">
      <div>
        <img src="../../../public/list-1/box6.png" alt="" />
        <h1>極致療癒‧奢華意境</h1>
        <h5>Ultimate RejuvenationA Realm of Luxury</h5>
        <p>25公尺長無邊際泳池</p>
        <p>及占地1500平方公尺的水療SPA</p>
        <p>內嵌落地玻璃窗，東京天際線盡收眼底</p>
      </div>
    </div>
    <!-- 第七個 -->
    <div class="scss-test-box7">
      <div>
        <div>
          <img src="../../../public/list-1/box7.png" alt="" />
        </div>
        <div>
          <img src="../../../public/list-1/box7-2.png" alt="" />
        </div>
        <div><img src="../../../public/list-1/box7-1.png" alt="" /></div>
      </div>
    </div>
    <!-- 第八個 -->
    <div class="scss-test-box8">
      <div>
        <h3>THE</h3>
        <h3>HIRAMATSU</h3>
        <h4>仙石原</h4>
        <img src="../../../public/list-1/box8-1.png" alt="" />
      </div>
    </div>
    <!-- 第九個 -->
    <div class="scss-test-box9">
      <div class="box9-1">
        <div>
          <img src="../../../public/list-1/box9.png" alt="" />
        </div>
        <div class="box9-1-3">
          <img src="../../../public//list-1/box9-1.png" alt="" />
          <p>行家鍾愛法饌之宿</p>
          <p>外輪山群峰競秀</p>
          <p>瞭望箱根四時之美</p>
          <p>大片玻璃觀景窗</p>
          <p>感受仙石原的靈動婀娜</p>
          <img src="../../../public/list-1/box9-2.png" alt="" />
        </div>
        <div>
          <img
            src="../../../public/list-1/box9-3.png"
            style="width: 80%"
            alt=""
          />
        </div>
      </div>
    </div>
    <!-- 第十個 -->
    <div class="scss-test-box10">
      <div class="box10-1">
        <div><img src="../../../public/list-1/box10.png" alt="" /></div>
        <div><img src="../../../public//list-1/box10-1.png" alt="" /></div>
        <div class="box10-1-3">
          <h1>箱根名湯</h1>
          <h1>新姥子溫泉</h1>
          <p>透明泉質具美容功效</p>
          <p>全11室皆附半露天溫</p>
          <p>泉天然源泉汨汨湧流</p>
        </div>
      </div>
    </div>
    <div class="scss-test-box11">
      <div class="box11-1">
        <div class="box11-1-1">
          <div>
            <h4>CUISINE</h4>
            <div class="box11-1-1-2">
              <p>法義料理翻玩和風</p>
              <p>濃淡皆宜宛如藝品</p>
              <p>料理長吉越謙二郎獨創流派</p>
              <p>饕餮之士不遠千里而來</p>
              <p>不受傳統日式旅館用餐時限</p>
              <p>旅行更隨心所欲</p>
            </div>
          </div>
          <div class="box11-1-1-2">
            <h3>琉璃仙石</h3>
            <h4>喫嘗箱根自然風土</h4>
          </div>
        </div>
        <div>
          <img src="../../../public/list-1/box11.png" alt="" />
        </div>
        <div>
          <img src="../../../public//list-1/box10-1.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.scss-test-box1 {
  @extend %container-100;
  background-image: url('../../../public/list-1/20221116_200021_886eb28e_w1920.jpg');
  background-size: cover;
  > div {
    color: rgb(255, 255, 255);
    text-align: center;
    > div {
      > div {
        > div {
          margin-top: 10px;
          border-top: 1px solid whitesmoke;
          > h2 {
            font-family: arial, sans-serif;
            font-size: 18px;
            margin: 10px;
          }
        }
      }
    }
  }
}
.scss-test-box2 {
  @extend %container-100;
  background-image: url('../../../public/list-1/jcr_content.jpg');
  background-size: cover;
  > div {
    > div {
      > div {
        img {
          width: 100%;
        }
      }
      div {
        margin-top: 10px;
        border-top: 1px solid whitesmoke;
        text-align: center;
        color: aliceblue;
      }
    }
  }
}
.scss-test-box3 {
  @extend %container-100;
  > div {
    display: flex;
    img {
      display: block;
      margin-top: 20px;
    }
    p {
      margin: 5px;
      text-align: center;
      font-size: 20px;
      text-shadow: 1px 1px 1px;
    }
    &:nth-child(2) {
      position: relative;
      top: -20vh;
    }
  }
}
.scss-test-box4 {
  @extend %container-100;
  background-color: black;
  > div {
    p {
      color: white;
      font-size: 20px;
      text-shadow: 1px 1px 3px wheat;
      margin-top: 20px;
    }
    h1 {
      color: white;
      text-shadow: 1px 1px 3px wheat;
      margin-top: 20px;
    }
    display: flex;
    > div {
      margin: 30px;
    }
    > div:nth-child(2) {
      div {
        width: 100%;
        height: 2px;
        background-color: #fe9c08;
      }
    }
  }
}
.scss-test-box5 {
  @extend %container-100;
  background-color: black;
  p {
    color: white;
    font-size: 20px;
    text-shadow: 1px 1px 3px wheat;
  }
  div {
    margin: 0px 10px;
    margin-top: auto;
    margin-bottom: auto;
  }
  > div {
    display: flex;
  }
}
.scss-test-box6 {
  @extend %container-100;
  height: 50vh;
  > div {
    text-align: center;
    text-shadow: 1px 1px 2px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 20px;
    margin-top: 10vh;
  }
  p,
  h1 {
    margin-top: 15px;
  }
}
.scss-test-box7 {
  @extend %container-100;

  > div {
    display: flex;
    div:nth-child(2) {
      width: 0;
      z-index: 1;
      display: flex;
      justify-content: center;
    }
  }
}
.scss-test-box8 {
  @extend %container-100;
  font-size: 50px;
  color: aliceblue;
  text-align: center;
  background-image: url('../../../public/list-1/box8.jpg');
  background-size: cover;
  p,
  img {
    margin-top: 40px;
  }
}
.scss-test-box9 {
  @extend %container-100;
  > div {
    display: flex;
    text-align: center;
    p {
      font-size: 20px;
      text-shadow: 1px 1px 3px rgb(163, 163, 163);
      margin-top: 20px;
    }
    div:nth-child(2) {
      > img {
        margin-top: 40px;
      }
    }
    div:nth-child(3) {
      > img {
        width: 80%;
      }
    }
  }
}
.scss-test-box10 {
  @extend %container-100;
  background-color: black;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 23px;
    text-align: center;
    text-shadow: 1px 1px 3px rgb(32, 63, 0);
    color: rgb(238, 238, 238);
  }
  div:nth-child(3) {
    margin: 0px 0px 0px 20px;
    h1:nth-child(1)::before {
      content: 'SPA';
      font-family: Georgia, Times, Times;
      font-size: 80px;
      font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
      color: rgb(21, 235, 32);
    }
  }
}
.scss-test-box11 {
  @extend %container-100;
  > div {
    display: flex;
    > div:nth-child(1) {
      display: flex;
      font-size: 30px;
      > div:nth-child(0) {
        font-size: 60px;
        color: rgb(177, 127, 91);
        P {
          writing-mode: vertical-rl;
        }
      }
      > div:nth-child(2) {
        writing-mode: vertical-rl;
        > h3 {
          color: rgb(177, 127, 91);
          font-size: 40px;
        }
        > h4 {
          margin-top: 40px;
          font-size: 40px;
        }
      }
    }
  }
}
</style>
