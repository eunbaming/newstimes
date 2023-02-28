# Newstimes 웹사이트


실제 뉴스타임즈 웹사이트를 참고하여 뉴스 웹페이지 구축

![Newstimes](https://user-images.githubusercontent.com/110072947/221774080-c104ff6d-b018-4622-b707-ccaa42fc054c.png)

+ Demo : https://newstimes.vercel.app/

<br/>
<br/>

### 개발 목표

api의 의미와 api를 다루는 방법 이해를 기반으로 한 웹페이지 구축 및 Bootstrap과 Media Query을 이용하여 반응형으로 개발

<br/>
<br/>

### 사용 기술

<a href="#"><img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/></a>
<a href="#"><img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/></a>
<a href="#"><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/></a>
<a href="#"><img src="https://img.shields.io/badge/Bootstrap-7952B3?style=flat-square&logo=Bootstrap&logoColor=white"/></a>

<br/>
<br/>

### Advanced Feature

+ 상품 검색(왼쪽) 또는 카테고리(오른쪽) 클릭 시 해당 페이지 보여주도록 ui 개발

<a href="#"><img src="https://user-images.githubusercontent.com/110072947/221775327-269c0e0d-0890-4573-9539-7303159d8aea.png" width="400"></a>
<a href="#"><img src="https://user-images.githubusercontent.com/110072947/221775367-0d0debf4-6580-4083-a90d-ae54e0d279f8.png" width="400"></a>

<br>

+ 에러 핸들링 (api 관련 오류, 또는 검색 시 결과값이 없을 때 보여주는 ui 개발)

![Newstimes](https://user-images.githubusercontent.com/110072947/221775811-d9b04e39-853d-48b6-ac82-0c71c31d7f47.png)

```javascript
...
const getNews = async()=>{
  try {
    let header = new Headers({"x-api-key" : config.apiKey});
    url.searchParams.set('page', page);
    let response = await fetch(url,{headers : header});
    let data = await response.json();
    if(response.status == 200){
      if(data.total_hits == 0){
        throw new Error("No matches for your search");
      };
      news = data.articles;
      page = data.page;
      total_pages = data.total_pages;
      render();
      pagination();
    }else {
      throw new Error(data.message);
    };
  }catch(error) {
    errorRender(error.message);
  };
};
...
```

<br/>

+ 페이지네이션 개발

<a href="#"><img src="https://user-images.githubusercontent.com/110072947/221776337-34933c3d-43ff-461d-a937-95af9cec5f0e.png" width="400"></a>
<a href="#"><img src="https://user-images.githubusercontent.com/110072947/221776351-a7bb7080-c96f-461b-9e15-9f60ffd37831.png" width="400"></a>

<br>

+ Bootstrap과 Media Query를 이용한 반응형 개발

[Web ver.]

<a href="#"><img src="https://user-images.githubusercontent.com/110072947/221774080-c104ff6d-b018-4622-b707-ccaa42fc054c.png" width="400"></a>
<a href="#"><img src="https://user-images.githubusercontent.com/110072947/221775367-0d0debf4-6580-4083-a90d-ae54e0d279f8.png" width="400"></a>

[Mobile ver.]

<a href="#"><img src="https://user-images.githubusercontent.com/110072947/221776819-6973de74-070b-46e3-9497-d47fe52b2f91.png" width="400"></a>
<a href="#"><img src="https://user-images.githubusercontent.com/110072947/221776814-98bff5d1-d212-495e-a237-5d376ddaea2d.png" width="400"></a>

<br/>
<br/>

# 개선 사항

+ 로딩될 때 로딩스피너가 보여질 수 있도록 개선 필요





