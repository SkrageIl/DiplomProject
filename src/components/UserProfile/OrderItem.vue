<template>
  <div class="order-item">
    <div class="top-content">
      <div class="top-content__status-time">
        <div class="status-block">
          <span v-if="orderItem_data.status == 'Готовим'">
            <easy-spinner type="spins" size="1.25em" color="#d7b509"/>
          </span>
          <span v-else-if="orderItem_data.status == 'Готов'">
            <span class="material-icons status-block__ready">volunteer_activism</span>
          </span>
          <span v-else-if="orderItem_data.status == 'Завершен'">
            <span class="material-icons status-block__done">done</span>
          </span>
          <span class="top-content__status" :class="classes">{{ orderItem_data.status }}</span>
        </div>

        <div class="top-content__time">
          <span>{{ orderItem_data.time.split(" ")[0] }}</span>
          <span>{{ orderItem_data.time.split(" ")[1] }}</span>
        </div>
      </div>
      <div class="top-content__features">
        <span class="features-top">
            #{{ orderItem_data.id }} на {{ orderItem_data.total }} &#8381;
        </span>
        <span class="features-address">{{ orderItem_data.address }}</span>
      </div>
      <div class="bot-content">
        <div class="bot-content__order-items">
          <ul class="bot-content__items" ref="items">
            <li v-for="item in orderItem_data.item" :key="item.index" class="bot-content__item">
              <div class="img-item" :class="classBg(item)">
                <img :src="require(`@/assets/catalog/${item.img}.png`)" alt="" class="bot-content__img">
              </div>
              <div class="bot-content__features">
                <span class="bot-content__name">
                  {{ item.name }}
                  <span v-if="item.size">({{item.size}}л)</span>
                </span>
                <span class="bot-content__price">{{ item.price }} &#8381;</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "OrderItem",
  components:{
  },
  mounted() {
    const container = this.$refs.items
    container.addEventListener('wheel', (e) => {
      e.preventDefault();
      container.scrollLeft += e.deltaY
    })
  },
  data() {
    return {
      classes: {
        cook: this.orderItem_data.status == 'Готовим',
        ready: this.orderItem_data.status == 'Готов',
        done: this.orderItem_data.status == 'Завершен'
      }
    } 
  },
  props: {
    orderItem_data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    classBg(item){
      if(item.type == 'Чай'){
        return "tea"
      } else if(item.type == 'Кофе'){
        return "coffee"
      } else if(item.type == 'Сладкое'){
        return "sweet"
      } else if(item.type == 'Сытное'){
        return "meal"
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.order-item{
  font-family: 'Montserrat', sans-serif;
  margin: 1em;
  max-width: 17em;
  display: grid;
  grid-template-columns: 1fr;
  border-radius: 22px;
  width: auto;
  -webkit-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
}
.top-content{
  width: 17em;
  &__features{
    display: grid;
    justify-items: left;
    padding: 0.5em;
  }
  &__status-time{
    justify-content: space-between;
    display: flex;
    padding: 1em 1em 0;
    color: #999999;
  }
  &__status{
    font-weight: 600;
    margin-left: 5px;
    color: #d7b509
  }
  &__time{
    display: grid;
    grid-template-rows: 1fr 1fr;
    text-align: right;
  }
}
.bot-content{
  &__img{
    width: 3.25em;
  }
  &__items{
    display: flex;
    align-items: flex-end;
    overflow-x: scroll;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    list-style: none;
    padding: 0;
    
  }
  &__items::-webkit-scrollbar { width: 0; }
  &__items{ -ms-overflow-style: none; }
  &__items{ overflow: -moz-scrollbars-none; }

  &__item{
    padding: 0.7em;
    display: grid;
    justify-items: center;
  }
  &__order-items{
    width: auto;
  }
  &__features{
    display: grid;
    max-width: 5em;
  }
  &__name{
    min-height: 2.5em;
    color: #999999;
    text-align: left;
  }
  &__price{
    font-weight: 600;
    color: #3a3939;
  }
}
.status-block{
  display: flex;
  align-items: center;
  width: 40%;
  &__done{
    color: green;
  }
  &__ready{
    color: #800000;
    margin: 0.2em;
  }
}
.cook{
  color: #d7b509 !important;
}
.ready{
  color: #800000 !important;
}
.done{
  color: green !important;
}
.coffee{
  background-color: #FFB21C !important;
}
.tea{
  background-color: #69af60 !important;
}
.sweet{
  background-color: #f6a9f9 !important;
}
.meal{
  background-color: #f57878  !important;
}
  .features-top{
    font-weight: 700;
    font-size: 1.25em;
  }
  .features-address{
    color: #999999;
  }
  .img-item{
    min-height: 5em;
    min-width: 5em;
    display: grid;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
  }
  @media(min-width: 576px){
    .order-item{
      font-family: 'Montserrat', sans-serif;
      margin: 1em;
      display: grid;
      grid-template-columns: 1fr;
      border-radius: 22px;
      max-width: 31em;
      box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
    }
    .top-content{
      width: 30em;
    }
  }
</style>