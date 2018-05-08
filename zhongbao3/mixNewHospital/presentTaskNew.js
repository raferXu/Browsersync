/**
 * Created by raferxu on 17/9/22.
 */
pybossa.presentTask(function (task, deferred) {
  if (!$.isEmptyObject(task)) {

    var jsloadDoneTimer = setInterval(function () {
      console.log('presentTaskjsloadDone: '+jsloadDone);
      if (jsloadDone) {
        clearInterval(jsloadDoneTimer);

        console.log('blockStr: ' + blockStr);

        var way = {};

        switch (taskType) {
          case 'sn':
            way.setInputVal = function (task) {
              setInputVal(task, 10, '0123456789', blockStr);
            };
            way.textAnswer = function () {
              return getCurStr();
            };
            break;
          case 'hospital':
            way.setInputVal = function (task) {
              setInputVal(task);
            };
            way.textAnswer = function () {
              return $('.showInfo').val();
            };

            $('#search-form').html('');
            var json = {
              "body": {
                "tasks": [
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海市第一妇婴保健院",
                      "上海市第一妇婴保健院",
                      "上海市第一妇婴保健院"
                    ],
                    "pic": "/token/img/2b4c8d85b1dcfcabe957fa2508bc5146",
                    "project": "hospital",
                    "user_ids": [
                      2,
                      1,
                      3
                    ],
                    "result": "上海市第一妇婴保健院",
                    "validation_time": "2017-09-21 14:21:21",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 301
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "复旦大学附属妇产科医院",
                      "复旦大学附属妇产科医院",
                      "复旦大学附属妇产科医院"
                    ],
                    "pic": "/token/img/656a173485a14b5250a445c3042b0f6b",
                    "project": "hospital",
                    "user_ids": [
                      2,
                      1,
                      3
                    ],
                    "result": "复旦大学附属妇产科医院",
                    "validation_time": "2017-09-21 14:21:22",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 302
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海市第五人民医院",
                      "上海市第五人民医院",
                      "上海市第五人民医院"
                    ],
                    "pic": "/token/img/10e9124e088c8b7fbad2908b95bf4d01",
                    "project": "hospital",
                    "user_ids": [
                      2,
                      1,
                      3
                    ],
                    "result": "上海市第五人民医院",
                    "validation_time": "2017-09-21 14:21:23",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 303
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海交通大学医学院附属仁济医院",
                      "上海交通大学医学院附属仁济医院",
                      "上海交通大学医学院附属仁济医院"
                    ],
                    "pic": "/token/img/4d80e48c24957f4337d4fe09ce1f8cf3",
                    "project": "hospital",
                    "user_ids": [
                      2,
                      1,
                      3
                    ],
                    "result": "上海交通大学医学院附属仁济医院",
                    "validation_time": "2017-09-21 14:21:24",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 304
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海交通大学医学院附属仁济医院",
                      "上海交通大学医学院附属仁济医院",
                      "上海交通大学医学院附属仁济医院"
                    ],
                    "pic": "/token/img/7f9f6cc5c355156c0f65bb2dd7b36a47",
                    "project": "hospital",
                    "user_ids": [
                      2,
                      4,
                      1
                    ],
                    "result": "上海交通大学医学院附属仁济医院",
                    "validation_time": "2017-09-21 14:35:03",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 305
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "复旦大学附属华山医院",
                      "复旦大学附属华山医院",
                      "复旦大学附属华山医院"
                    ],
                    "pic": "/token/img/4db029a4d1d827c33d3eb462b920a61d",
                    "project": "hospital",
                    "user_ids": [
                      4,
                      1,
                      2
                    ],
                    "result": "复旦大学附属华山医院",
                    "validation_time": "2017-09-21 14:35:04",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 306
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海市中医医院",
                      "上海市中医医院",
                      "上海市中医医院"
                    ],
                    "pic": "/token/img/0d323a7dffa0a9286483fa51c37a7240",
                    "project": "hospital",
                    "user_ids": [
                      4,
                      1,
                      2
                    ],
                    "result": "上海市中医医院",
                    "validation_time": "2017-09-21 14:35:06",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 307
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海中医药大学附属岳阳中西医结合医院",
                      "上海中医药大学附属岳阳中西医结合医院",
                      "上海中医药大学附属岳阳中西医结合医院"
                    ],
                    "pic": "/token/img/91ff918905577d894e1503d2c698cb46",
                    "project": "hospital",
                    "user_ids": [
                      2,
                      4,
                      1
                    ],
                    "result": "上海中医药大学附属岳阳中西医结合医院",
                    "validation_time": "2017-09-21 14:35:06",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 308
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海交通大学医学院附属瑞金医院",
                      "上海交通大学医学院附属瑞金医院",
                      "上海交通大学医学院附属瑞金医院"
                    ],
                    "pic": "/token/img/66e8f14e61f53d7f7473b4459171b84b",
                    "project": "hospital",
                    "user_ids": [
                      1,
                      4,
                      2
                    ],
                    "result": "上海交通大学医学院附属瑞金医院",
                    "validation_time": "2017-09-21 14:35:07",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 309
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海市同仁医院",
                      "上海市同仁医院",
                      "上海市同仁医院"
                    ],
                    "pic": "/token/img/c16ad063ab066334affd40980e8d3f00",
                    "project": "hospital",
                    "user_ids": [
                      2,
                      1,
                      4
                    ],
                    "result": "上海市同仁医院",
                    "validation_time": "2017-09-21 14:35:08",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 310
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海市闵行区中心医院",
                      "上海市闵行区中心医院",
                      "上海市闵行区中心医院"
                    ],
                    "pic": "/token/img/0c55b6cc78e69800030fe47889ea7612",
                    "project": "hospital",
                    "user_ids": [
                      4,
                      2,
                      1
                    ],
                    "result": "上海市闵行区中心医院",
                    "validation_time": "2017-09-21 14:35:09",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 311
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "复旦大学附属肿瘤医院",
                      "复旦大学附属肿瘤医院",
                      "复旦大学附属肿瘤医院"
                    ],
                    "pic": "/token/img/c858a5b933692d3c28cabe1727d2eefd",
                    "project": "hospital",
                    "user_ids": [
                      2,
                      1,
                      4
                    ],
                    "result": "复旦大学附属肿瘤医院",
                    "validation_time": "2017-09-21 14:35:10",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 312
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海中医药大学附属岳阳中西医结合医院",
                      "上海中医药大学附属岳阳中西医结合医院",
                      "上海中医药大学附属岳阳中西医结合医院"
                    ],
                    "pic": "/token/img/6dd461fb56a301d5611403e75447454e",
                    "project": "hospital",
                    "user_ids": [
                      2,
                      1,
                      4
                    ],
                    "result": "上海中医药大学附属岳阳中西医结合医院",
                    "validation_time": "2017-09-21 14:35:11",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 313
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海交通大学医学院附属新华医院",
                      "上海交通大学医学院附属新华医院",
                      "上海交通大学医学院附属新华医院"
                    ],
                    "pic": "/token/img/a81f2fc01dd0c7b4789d81b9a02e23e1",
                    "project": "hospital",
                    "user_ids": [
                      1,
                      4,
                      2
                    ],
                    "result": "上海交通大学医学院附属新华医院",
                    "validation_time": "2017-09-21 14:35:12",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 314
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海市闵行区中心医院",
                      "上海市闵行区中心医院",
                      "上海市闵行区中心医院"
                    ],
                    "pic": "/token/img/f053f0971ebe42f8d1c663c72ad6e759",
                    "project": "hospital",
                    "user_ids": [
                      2,
                      1,
                      4
                    ],
                    "result": "上海市闵行区中心医院",
                    "validation_time": "2017-09-21 14:35:13",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 315
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "复旦大学附属肿瘤医院",
                      "复旦大学附属肿瘤医院",
                      "复旦大学附属肿瘤医院"
                    ],
                    "pic": "/token/img/8352a92097f4ad4b40ce500fb525ced1",
                    "project": "hospital",
                    "user_ids": [
                      2,
                      1,
                      8
                    ],
                    "result": "复旦大学附属肿瘤医院",
                    "validation_time": "2017-09-21 15:22:49",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 316
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "浦东新区人民医院",
                      "浦东新区人民医院",
                      "浦东新区人民医院"
                    ],
                    "pic": "/token/img/80a232c79ed84502b70f776e0a6e9cd4",
                    "project": "hospital",
                    "user_ids": [
                      1,
                      8,
                      2
                    ],
                    "result": "浦东新区人民医院",
                    "validation_time": "2017-09-21 15:22:52",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 317
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "复旦大学附属妇产科医院",
                      "复旦大学附属妇产科医院",
                      "复旦大学附属妇产科医院"
                    ],
                    "pic": "/token/img/3b39e5c834166cd40190607d1f4d71fd",
                    "project": "hospital",
                    "user_ids": [
                      1,
                      8,
                      2
                    ],
                    "result": "复旦大学附属妇产科医院",
                    "validation_time": "2017-09-21 15:22:51",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 318
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海市第五人民医院",
                      "上海市第五人民医院",
                      "上海市第五人民医院"
                    ],
                    "pic": "/token/img/dca12c3f0592774a8928b20a2d7617e2",
                    "project": "hospital",
                    "user_ids": [
                      2,
                      8,
                      1
                    ],
                    "result": "上海市第五人民医院",
                    "validation_time": "2017-09-21 15:22:48",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 319
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "社区卫生服务中心",
                      "社区卫生服务中心",
                      "社区卫生服务中心"
                    ],
                    "pic": "/token/img/f303bccacfd595a37f45a5beea7886d7",
                    "project": "hospital",
                    "user_ids": [
                      1,
                      2,
                      8
                    ],
                    "result": "社区卫生服务中心",
                    "validation_time": "2017-09-21 15:22:52",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 320
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "复旦大学附属中山医院",
                      "复旦大学附属中山医院",
                      "复旦大学附属中山医院"
                    ],
                    "pic": "/token/img/a15e00da010f44c86665edcb9a5248f1",
                    "project": "hospital",
                    "user_ids": [
                      1,
                      2,
                      8
                    ],
                    "result": "复旦大学附属中山医院",
                    "validation_time": "2017-09-21 15:22:59",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 321
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海交通大学医学院附属仁济医院",
                      "上海交通大学医学院附属仁济医院",
                      "上海交通大学医学院附属仁济医院"
                    ],
                    "pic": "/token/img/9a23fcf4f17bcc7b741f8536a6c3c3b4",
                    "project": "hospital",
                    "user_ids": [
                      2,
                      8,
                      1
                    ],
                    "result": "上海交通大学医学院附属仁济医院",
                    "validation_time": "2017-09-21 15:23:00",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 322
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海交通大学医学院附属瑞金医院",
                      "上海交通大学医学院附属瑞金医院",
                      "上海交通大学医学院附属瑞金医院"
                    ],
                    "pic": "/token/img/4e32d01c1ccc2375fc952008dc8f119d",
                    "project": "hospital",
                    "user_ids": [
                      2,
                      1,
                      8
                    ],
                    "result": "上海交通大学医学院附属瑞金医院",
                    "validation_time": "2017-09-21 15:23:01",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 323
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海交通大学医学院附属瑞金医院",
                      "上海交通大学医学院附属瑞金医院",
                      "上海交通大学医学院附属瑞金医院"
                    ],
                    "pic": "/token/img/8a26459d7e22315498405aa8342951a2",
                    "project": "hospital",
                    "user_ids": [
                      2,
                      8,
                      1
                    ],
                    "result": "上海交通大学医学院附属瑞金医院",
                    "validation_time": "2017-09-21 15:23:02",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 324
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海市第一妇婴保健院",
                      "上海市第一妇婴保健院",
                      "上海市第一妇婴保健院"
                    ],
                    "pic": "/token/img/2c710ef30f6bb76caf255ee43ffdac5d",
                    "project": "hospital",
                    "user_ids": [
                      2,
                      1,
                      8
                    ],
                    "result": "上海市第一妇婴保健院",
                    "validation_time": "2017-09-21 15:23:03",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 325
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海交通大学医学院附属仁济医院",
                      "上海交通大学医学院附属仁济医院",
                      "上海交通大学医学院附属仁济医院"
                    ],
                    "pic": "/token/img/36cf66dd2a1b3d72fa5839ff33d984b6",
                    "project": "hospital",
                    "user_ids": [
                      2,
                      8,
                      1
                    ],
                    "result": "上海交通大学医学院附属仁济医院",
                    "validation_time": "2017-09-21 15:23:03",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 326
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海交通大学医学院附属瑞金医院",
                      "上海交通大学医学院附属瑞金医院",
                      "上海交通大学医学院附属瑞金医院"
                    ],
                    "pic": "/token/img/5322e1a7ba4e70ba77dff0ac6bd54501",
                    "project": "hospital",
                    "user_ids": [
                      8,
                      1,
                      2
                    ],
                    "result": "上海交通大学医学院附属瑞金医院",
                    "validation_time": "2017-09-21 15:23:11",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 327
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海交通大学医学院附属仁济医院",
                      "上海交通大学医学院附属仁济医院",
                      "上海交通大学医学院附属仁济医院"
                    ],
                    "pic": "/token/img/aa6c364e24ced19c520f3d235412c33e",
                    "project": "hospital",
                    "user_ids": [
                      2,
                      8,
                      1
                    ],
                    "result": "上海交通大学医学院附属仁济医院",
                    "validation_time": "2017-09-21 15:23:12",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 328
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海交通大学医学院附属仁济医院",
                      "上海交通大学医学院附属仁济医院",
                      "上海交通大学医学院附属仁济医院"
                    ],
                    "pic": "/token/img/869ce5d6533e8691271fcc452b7299e5",
                    "project": "hospital",
                    "user_ids": [
                      2,
                      8,
                      1
                    ],
                    "result": "上海交通大学医学院附属仁济医院",
                    "validation_time": "2017-09-21 15:23:13",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 329
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海中医药大学附属岳阳中西医结合医院",
                      "上海中医药大学附属岳阳中西医结合医院",
                      "上海中医药大学附属岳阳中西医结合医院"
                    ],
                    "pic": "/token/img/f6e89731fb73b740a0275ea4b856dd62",
                    "project": "hospital",
                    "user_ids": [
                      1,
                      2,
                      8
                    ],
                    "result": "上海中医药大学附属岳阳中西医结合医院",
                    "validation_time": "2017-09-21 15:23:14",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 330
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "复旦大学附属妇产科医院",
                      "复旦大学附属妇产科医院",
                      "复旦大学附属妇产科医院"
                    ],
                    "pic": "/token/img/195fd27dbc66fd6bc781b919aadcc60f",
                    "project": "hospital",
                    "user_ids": [
                      1,
                      8,
                      2
                    ],
                    "result": "复旦大学附属妇产科医院",
                    "validation_time": "2017-09-21 15:23:26",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 331
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "复旦大学附属妇产科医院",
                      "复旦大学附属妇产科医院",
                      "复旦大学附属妇产科医院"
                    ],
                    "pic": "/token/img/1ef5826e2ca3aae864b954e0e00b83ef",
                    "project": "hospital",
                    "user_ids": [
                      1,
                      2,
                      8
                    ],
                    "result": "复旦大学附属妇产科医院",
                    "validation_time": "2017-09-21 15:23:27",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 332
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海市第五人民医院",
                      "上海市第五人民医院",
                      "上海市第五人民医院"
                    ],
                    "pic": "/token/img/a35596bf5cc0f6f68d35780e45396122",
                    "project": "hospital",
                    "user_ids": [
                      1,
                      2,
                      8
                    ],
                    "result": "上海市第五人民医院",
                    "validation_time": "2017-09-21 15:23:28",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 333
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海市同仁医院",
                      "上海市同仁医院",
                      "上海市同仁医院"
                    ],
                    "pic": "/token/img/b7b0519e49e871a7af92e958f9aa76f7",
                    "project": "hospital",
                    "user_ids": [
                      1,
                      2,
                      8
                    ],
                    "result": "上海市同仁医院",
                    "validation_time": "2017-09-21 15:23:32",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 334
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "同济大学附属第十人民医院",
                      "同济大学附属第十人民医院",
                      "同济大学附属第十人民医院"
                    ],
                    "pic": "/token/img/24834f4744201cbca87a6a186e8053fe",
                    "project": "hospital",
                    "user_ids": [
                      1,
                      2,
                      8
                    ],
                    "result": "同济大学附属第十人民医院",
                    "validation_time": "2017-09-21 15:23:32",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 335
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "同济大学附属第十人民医院",
                      "同济大学附属第十人民医院",
                      "同济大学附属第十人民医院"
                    ],
                    "pic": "/token/img/bb3c0ce9177dd04fa2db5d0996b9f5df",
                    "project": "hospital",
                    "user_ids": [
                      1,
                      2,
                      8
                    ],
                    "result": "同济大学附属第十人民医院",
                    "validation_time": "2017-09-21 15:23:37",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 336
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海交通大学医学院附属仁济医院",
                      "上海交通大学医学院附属仁济医院",
                      "上海交通大学医学院附属仁济医院"
                    ],
                    "pic": "/token/img/18a082ccbf8c71508eaf971d79d37c25",
                    "project": "hospital",
                    "user_ids": [
                      1,
                      2,
                      8
                    ],
                    "result": "上海交通大学医学院附属仁济医院",
                    "validation_time": "2017-09-21 15:23:38",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 337
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海市闵行区中心医院",
                      "上海市闵行区中心医院",
                      "上海市闵行区中心医院"
                    ],
                    "pic": "/token/img/a0a4ccc7080b6f36617d45410d4f3c6b",
                    "project": "hospital",
                    "user_ids": [
                      1,
                      2,
                      8
                    ],
                    "result": "上海市闵行区中心医院",
                    "validation_time": "2017-09-21 15:23:39",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 338
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海交通大学医学院附属仁济医院",
                      "上海交通大学医学院附属仁济医院",
                      "上海交通大学医学院附属仁济医院"
                    ],
                    "pic": "/token/img/cb28efa0e6c8210f847ce11903cd5507",
                    "project": "hospital",
                    "user_ids": [
                      1,
                      2,
                      8
                    ],
                    "result": "上海交通大学医学院附属仁济医院",
                    "validation_time": "2017-09-21 15:23:39",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 339
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "复旦大学附属中山医院",
                      "复旦大学附属中山医院",
                      "复旦大学附属中山医院"
                    ],
                    "pic": "/token/img/e79417101e78b9770d19a8a38f3c97ef",
                    "project": "hospital",
                    "user_ids": [
                      1,
                      8,
                      2
                    ],
                    "result": "复旦大学附属中山医院",
                    "validation_time": "2017-09-21 15:23:40",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 340
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海市静安区中心医院复旦大学附属华山医院静安分院",
                      "上海市静安区中心医院复旦大学附属华山医院静安分院",
                      "上海市静安区中心医院复旦大学附属华山医院静安分院"
                    ],
                    "pic": "/token/img/748dac6bb4249892fd9e8b890cc83819",
                    "project": "hospital",
                    "user_ids": [
                      1,
                      2,
                      8
                    ],
                    "result": "上海市静安区中心医院复旦大学附属华山医院静安分院",
                    "validation_time": "2017-09-21 15:58:53",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 341
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海交通大学医学院附属仁济医院",
                      "上海交通大学医学院附属仁济医院",
                      "上海交通大学医学院附属仁济医院"
                    ],
                    "pic": "/token/img/25bd82df4265e94cca03b4bb68494aea",
                    "project": "hospital",
                    "user_ids": [
                      1,
                      2,
                      6
                    ],
                    "result": "上海交通大学医学院附属仁济医院",
                    "validation_time": "2017-09-21 15:24:42",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 342
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海市第五人民医院",
                      "上海市第五人民医院",
                      "上海市第五人民医院"
                    ],
                    "pic": "/token/img/ac7dd7c1af65162ce0e6e5a24797223d",
                    "project": "hospital",
                    "user_ids": [
                      1,
                      2,
                      6
                    ],
                    "result": "上海市第五人民医院",
                    "validation_time": "2017-09-21 15:24:46",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 343
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海市闵行区中心医院",
                      "上海市闵行区中心医院",
                      "上海市闵行区中心医院"
                    ],
                    "pic": "/token/img/e72a335b6461c653999427033ef19ba6",
                    "project": "hospital",
                    "user_ids": [
                      1,
                      2,
                      6
                    ],
                    "result": "上海市闵行区中心医院",
                    "validation_time": "2017-09-21 15:24:43",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 344
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "复旦大学附属妇产科医院",
                      "复旦大学附属妇产科医院",
                      "复旦大学附属妇产科医院"
                    ],
                    "pic": "/token/img/dc8d232d2616e5e777b19e9d22f10c89",
                    "project": "hospital",
                    "user_ids": [
                      1,
                      2,
                      6
                    ],
                    "result": "复旦大学附属妇产科医院",
                    "validation_time": "2017-09-21 15:24:44",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 345
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海市闵行区中心医院",
                      "上海市闵行区中心医院",
                      "上海市闵行区中心医院"
                    ],
                    "pic": "/token/img/5e869842589b8191c261d63e5c61e3ef",
                    "project": "hospital",
                    "user_ids": [
                      1,
                      2,
                      6
                    ],
                    "result": "上海市闵行区中心医院",
                    "validation_time": "2017-09-21 15:24:49",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 346
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "复旦大学附属华山医院北院",
                      "复旦大学附属华山医院北院",
                      "复旦大学附属华山医院北院"
                    ],
                    "pic": "/token/img/fec996de196ce3bea7aa6b699ccee4c4",
                    "project": "hospital",
                    "user_ids": [
                      1,
                      2,
                      6
                    ],
                    "result": "复旦大学附属华山医院北院",
                    "validation_time": "2017-09-21 15:24:50",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 347
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海交通大学医学院附属瑞金医院",
                      "上海交通大学医学院附属瑞金医院",
                      "上海交通大学医学院附属瑞金医院"
                    ],
                    "pic": "/token/img/73089a1bab111e532ec9bfb7c91cb97a",
                    "project": "hospital",
                    "user_ids": [
                      1,
                      2,
                      6
                    ],
                    "result": "上海交通大学医学院附属瑞金医院",
                    "validation_time": "2017-09-21 15:24:51",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 348
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海中医药大学附属岳阳中西医结合医院",
                      "上海中医药大学附属岳阳中西医结合医院",
                      "上海中医药大学附属岳阳中西医结合医院"
                    ],
                    "pic": "/token/img/9fde3336512b3c7c2394684df4a22365",
                    "project": "hospital",
                    "user_ids": [
                      2,
                      1,
                      6
                    ],
                    "result": "上海中医药大学附属岳阳中西医结合医院",
                    "validation_time": "2017-09-21 15:24:52",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 349
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海交通大学医学院附属新华医院",
                      "上海交通大学医学院附属新华医院",
                      "上海交通大学医学院附属新华医院"
                    ],
                    "pic": "/token/img/884ca4ead87c076b9b026607152ddd9c",
                    "project": "hospital",
                    "user_ids": [
                      2,
                      1,
                      6
                    ],
                    "result": "上海交通大学医学院附属新华医院",
                    "validation_time": "2017-09-21 15:24:52",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 350
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海市同仁医院",
                      "上海市同仁医院",
                      "上海市同仁医院"
                    ],
                    "pic": "/token/img/d42b282716bc0db765b61383e846eaeb",
                    "project": "hospital",
                    "user_ids": [
                      1,
                      2,
                      6
                    ],
                    "result": "上海市同仁医院",
                    "validation_time": "2017-09-21 15:24:53",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 351
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海市中医医院",
                      "上海市中医医院",
                      "上海市中医医院"
                    ],
                    "pic": "/token/img/6cd17bae3bb89477fe4dd2fd99644407",
                    "project": "hospital",
                    "user_ids": [
                      2,
                      1,
                      6
                    ],
                    "result": "上海市中医医院",
                    "validation_time": "2017-09-21 15:24:59",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 352
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海市第一妇婴保健院",
                      "上海市第一妇婴保健院",
                      "上海市第一妇婴保健院"
                    ],
                    "pic": "/token/img/98e6afa819600a52baa04cbbbe4657fc",
                    "project": "hospital",
                    "user_ids": [
                      2,
                      1,
                      6
                    ],
                    "result": "上海市第一妇婴保健院",
                    "validation_time": "2017-09-21 15:25:04",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 353
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海市同仁医院",
                      "1",
                      "上海市同仁医院"
                    ],
                    "pic": "/token/img/7d5b69faa7f5da602acba211d65a923b",
                    "project": "hospital",
                    "user_ids": [
                      2,
                      1,
                      6
                    ],
                    "result": "上海市同仁医院",
                    "validation_time": "2017-09-21 15:25:05",
                    "system_judge": [
                      1,
                      2,
                      1
                    ],
                    "id": 354
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海交通大学医学院附属仁济医院",
                      "上海交通大学医学院附属仁济医院",
                      "上海交通大学医学院附属仁济医院"
                    ],
                    "pic": "/token/img/aa945210a0bcb5e3efece987beae9b07",
                    "project": "hospital",
                    "user_ids": [
                      1,
                      6,
                      2
                    ],
                    "result": "上海交通大学医学院附属仁济医院",
                    "validation_time": "2017-09-21 15:25:06",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 355
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海市闵行区中心医院",
                      "上海市闵行区中心医院",
                      "上海市闵行区中心医院"
                    ],
                    "pic": "/token/img/73bfb64132e86e8e554dd00419425324",
                    "project": "hospital",
                    "user_ids": [
                      2,
                      1,
                      6
                    ],
                    "result": "上海市闵行区中心医院",
                    "validation_time": "2017-09-21 15:25:07",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 356
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海市第一妇婴保健院",
                      "上海市第一妇婴保健院",
                      "上海市第一妇婴保健院"
                    ],
                    "pic": "/token/img/9ded7cb6c00fc2507e8075a2d25eb1af",
                    "project": "hospital",
                    "user_ids": [
                      2,
                      1,
                      6
                    ],
                    "result": "上海市第一妇婴保健院",
                    "validation_time": "2017-09-21 15:25:07",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 357
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海中医药大学附属岳阳中西医结合医院",
                      "上海中医药大学附属岳阳中西医结合医院",
                      "上海中医药大学附属岳阳中西医结合医院"
                    ],
                    "pic": "/token/img/d7560ce819ad524cd7e9dd1fe0811b33",
                    "project": "hospital",
                    "user_ids": [
                      1,
                      6,
                      2
                    ],
                    "result": "上海中医药大学附属岳阳中西医结合医院",
                    "validation_time": "2017-09-21 15:25:08",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 358
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海市中医医院",
                      "上海市中医医院",
                      "上海市中医医院"
                    ],
                    "pic": "/token/img/ef69075d99a493b8730fc32f11c94e47",
                    "project": "hospital",
                    "user_ids": [
                      4,
                      1,
                      3
                    ],
                    "result": "上海市中医医院",
                    "validation_time": "2017-09-20 17:56:51",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 281
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "复旦大学附属妇产科医院",
                      "复旦大学附属妇产科医院",
                      "复旦大学附属妇产科医院"
                    ],
                    "pic": "/token/img/5a04e30d223e00497568a0801c112a37",
                    "project": "hospital",
                    "user_ids": [
                      4,
                      1,
                      3
                    ],
                    "result": "复旦大学附属妇产科医院",
                    "validation_time": "2017-09-20 17:56:52",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 282
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海交通大学医学院附属瑞金医院",
                      "上海交通大学医学院附属瑞金医院",
                      "上海交通大学医学院附属瑞金医院"
                    ],
                    "pic": "/token/img/329550d51cbca7cee14e4afcce849140",
                    "project": "hospital",
                    "user_ids": [
                      4,
                      1,
                      3
                    ],
                    "result": "上海交通大学医学院附属瑞金医院",
                    "validation_time": "2017-09-20 17:56:53",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 283
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海市第一妇婴保健院",
                      "上海市第一妇婴保健院",
                      "上海市第一妇婴保健院"
                    ],
                    "pic": "/token/img/5743ace6d625c53cb4f5705757cf69be",
                    "project": "hospital",
                    "user_ids": [
                      1,
                      4,
                      3
                    ],
                    "result": "上海市第一妇婴保健院",
                    "validation_time": "2017-09-20 17:56:54",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 284
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "第七人民医院",
                      "第七人民医院",
                      "第七人民医院"
                    ],
                    "pic": "/token/img/9e1602e153c2d32539fea9f17b8dcd2d",
                    "project": "hospital",
                    "user_ids": [
                      4,
                      1,
                      3
                    ],
                    "result": "第七人民医院",
                    "validation_time": "2017-09-20 17:56:56",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 285
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海市黄浦区中心医院",
                      "上海市黄浦区中心医院",
                      "上海市黄浦区中心医院"
                    ],
                    "pic": "/token/img/c594c0f90a633ad9a95788dacf8b50d6",
                    "project": "hospital",
                    "user_ids": [
                      4,
                      1,
                      3
                    ],
                    "result": "上海市黄浦区中心医院",
                    "validation_time": "2017-09-20 17:57:00",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 286
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "复旦大学附属中山医院",
                      "复旦大学附属中山医院",
                      "复旦大学附属中山医院"
                    ],
                    "pic": "/token/img/5ab10a484054297bec44834e2d0c214f",
                    "project": "hospital",
                    "user_ids": [
                      4,
                      1,
                      3
                    ],
                    "result": "复旦大学附属中山医院",
                    "validation_time": "2017-09-20 17:57:01",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 287
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "百度3",
                      "上海中医药大学附属龙华医院",
                      "上海中医药大学附属龙华医院"
                    ],
                    "pic": "/token/img/e5e1566b5d569965cc697189176913a2",
                    "project": "hospital",
                    "user_ids": [
                      4,
                      1,
                      3
                    ],
                    "result": "上海中医药大学附属龙华医院",
                    "validation_time": "2017-09-20 17:57:02",
                    "system_judge": [
                      2,
                      1,
                      1
                    ],
                    "id": 288
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海市第一妇婴保健院",
                      "上海市第一妇婴保健院",
                      "上海市第一妇婴保健院"
                    ],
                    "pic": "/token/img/70067cc9cb99051c217dceba1ea7560a",
                    "project": "hospital",
                    "user_ids": [
                      1,
                      3,
                      4
                    ],
                    "result": "上海市第一妇婴保健院",
                    "validation_time": "2017-09-20 17:57:50",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 289
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海交通大学医学院附属瑞金医院",
                      "上海交通大学医学院附属瑞金医院",
                      "上海交通大学医学院附属瑞金医院"
                    ],
                    "pic": "/token/img/3fb34c08425c266f5464eff07b1d4060",
                    "project": "hospital",
                    "user_ids": [
                      1,
                      3,
                      4
                    ],
                    "result": "上海交通大学医学院附属瑞金医院",
                    "validation_time": "2017-09-20 17:57:51",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 290
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海市静安区中心医院复旦大学附属华山医院静安分院",
                      "上海市静安区中心医院复旦大学附属华山医院静安分院",
                      "上海市静安区中心医院复旦大学附属华山医院静安分院"
                    ],
                    "pic": "/token/img/4f10c24109321b9fac6541acc126de12",
                    "project": "hospital",
                    "user_ids": [
                      1,
                      3,
                      4
                    ],
                    "result": "上海市静安区中心医院复旦大学附属华山医院静安分院",
                    "validation_time": "2017-09-20 17:57:52",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 291
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海市闵行区中心医院",
                      "上海市闵行区中心医院",
                      "上海市闵行区中心医院"
                    ],
                    "pic": "/token/img/a9bf518c3909622af4b06947b6db9819",
                    "project": "hospital",
                    "user_ids": [
                      1,
                      3,
                      4
                    ],
                    "result": "上海市闵行区中心医院",
                    "validation_time": "2017-09-20 17:57:53",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 292
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海中医药大学附属龙华医院",
                      "上海中医药大学附属龙华医院",
                      "上海中医药大学附属龙华医院"
                    ],
                    "pic": "/token/img/3d8b8c8ac2135de082d5ae4c7db8ae6e",
                    "project": "hospital",
                    "user_ids": [
                      1,
                      3,
                      4
                    ],
                    "result": "上海中医药大学附属龙华医院",
                    "validation_time": "2017-09-20 17:57:53",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 293
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海中医药大学附属岳阳中西医结合医院",
                      "上海中医药大学附属岳阳中西医结合医院",
                      "上海中医药大学附属岳阳中西医结合医院"
                    ],
                    "pic": "/token/img/868371be15471a5f12379fcc0090ab30",
                    "project": "hospital",
                    "user_ids": [
                      2,
                      1,
                      3
                    ],
                    "result": "上海中医药大学附属岳阳中西医结合医院",
                    "validation_time": "2017-09-21 14:11:59",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 294
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海中医药大学附属岳阳中西医结合医院",
                      "上海中医药大学附属岳阳中西医结合医院",
                      "上海中医药大学附属岳阳中西医结合医院"
                    ],
                    "pic": "/token/img/d827193dcf7cb6344169203597653c38",
                    "project": "hospital",
                    "user_ids": [
                      2,
                      1,
                      3
                    ],
                    "result": "上海中医药大学附属岳阳中西医结合医院",
                    "validation_time": "2017-09-21 14:21:14",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 295
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "复旦大学附属中山医院",
                      "复旦大学附属中山医院",
                      "复旦大学附属中山医院"
                    ],
                    "pic": "/token/img/9e161dc382536a49947bd2fc5b86e734",
                    "project": "hospital",
                    "user_ids": [
                      2,
                      1,
                      3
                    ],
                    "result": "复旦大学附属中山医院",
                    "validation_time": "2017-09-21 14:21:15",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 296
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海市公共卫生临床中心复旦大学附属中山医院（s）",
                      "上海市公共卫生临床中心复旦大学附属中山医院（s）",
                      "上海市公共卫生临床中心复旦大学附属中山医院（s）"
                    ],
                    "pic": "/token/img/70ad4579230c1a1827ceca879cf78e21",
                    "project": "hospital",
                    "user_ids": [
                      2,
                      1,
                      3
                    ],
                    "result": "上海市公共卫生临床中心复旦大学附属中山医院（s）",
                    "validation_time": "2017-09-21 14:21:16",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 297
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海市虹口区提篮桥街道社区卫生服务中心",
                      "上海市虹口区提篮桥街道社区卫生服务中心",
                      "上海市虹口区提篮桥街道社区卫生服务中心"
                    ],
                    "pic": "/token/img/d2fa7ac709f104b38e9b55b2502ff30f",
                    "project": "hospital",
                    "user_ids": [
                      2,
                      1,
                      3
                    ],
                    "result": "上海市虹口区提篮桥街道社区卫生服务中心",
                    "validation_time": "2017-09-21 14:21:17",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 298
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海中医药大学附属岳阳中西医结合医院",
                      "上海中医药大学附属岳阳中西医结合医院",
                      "上海中医药大学附属岳阳中西医结合医院"
                    ],
                    "pic": "/token/img/e1180a49a99c950016141430d8604267",
                    "project": "hospital",
                    "user_ids": [
                      2,
                      1,
                      3
                    ],
                    "result": "上海中医药大学附属岳阳中西医结合医院",
                    "validation_time": "2017-09-21 14:21:18",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 299
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海交通大学医学院附属仁济医院",
                      "上海交通大学医学院附属仁济医院",
                      "上海交通大学医学院附属仁济医院"
                    ],
                    "pic": "/token/img/2c154cfa64c3c543a8b2352b81560815",
                    "project": "hospital",
                    "user_ids": [
                      2,
                      1,
                      3
                    ],
                    "result": "上海交通大学医学院附属仁济医院",
                    "validation_time": "2017-09-21 14:21:20",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 300
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海市静安区中心医院复旦大学附属华山医院静安分院",
                      "上海市静安区中心医院复旦大学附属华山医院静安分院",
                      "上海市静安区中心医院复旦大学附属华山医院静安分院"
                    ],
                    "pic": "/token/img/af9461dc9fa4337a64d8b5da9011f278",
                    "project": "hospital",
                    "user_ids": [
                      9,
                      8,
                      10
                    ],
                    "result": "上海市静安区中心医院复旦大学附属华山医院静安分院",
                    "validation_time": "2017-09-20 10:17:04",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 261
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海市静安区中心医院复旦大学附属华山医院静安分院",
                      "上海市静安区中心医院复旦大学附属华山医院静安分院",
                      "上海市静安区中心医院复旦大学附属华山医院静安分院"
                    ],
                    "pic": "/token/img/08645c200b76e5cae3cf670273fd275d",
                    "project": "hospital",
                    "user_ids": [
                      9,
                      10,
                      8
                    ],
                    "result": "上海市静安区中心医院复旦大学附属华山医院静安分院",
                    "validation_time": "2017-09-20 10:17:05",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 262
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "浦东新区人民医院",
                      "浦东新区人民医院",
                      "浦东新区人民医院"
                    ],
                    "pic": "/token/img/092b1ebcf52ce583c46bdf0515d43f20",
                    "project": "hospital",
                    "user_ids": [
                      9,
                      8,
                      10
                    ],
                    "result": "浦东新区人民医院",
                    "validation_time": "2017-09-20 10:17:07",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 263
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海交通大学医学院附属仁济医院",
                      "上海交通大学医学院附属仁济医院",
                      "上海交通大学医学院附属仁济医院"
                    ],
                    "pic": "/token/img/f08739f5c3acec3e3d26363eff90db5d",
                    "project": "hospital",
                    "user_ids": [
                      9,
                      8,
                      10
                    ],
                    "result": "上海交通大学医学院附属仁济医院",
                    "validation_time": "2017-09-20 10:17:08",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 264
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海交通大学医学院附属仁济医院",
                      "上海交通大学医学院附属仁济医院",
                      "上海交通大学医学院附属仁济医院"
                    ],
                    "pic": "/token/img/a9e4a85ae1d7b5a4a215d2d4aa78d776",
                    "project": "hospital",
                    "user_ids": [
                      9,
                      8,
                      10
                    ],
                    "result": "上海交通大学医学院附属仁济医院",
                    "validation_time": "2017-09-20 10:17:09",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 265
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海交通大学医学院附属瑞金医院",
                      "上海交通大学医学院附属瑞金医院",
                      "上海交通大学医学院附属瑞金医院"
                    ],
                    "pic": "/token/img/9245223c674c6985fba860d66d16fb3b",
                    "project": "hospital",
                    "user_ids": [
                      9,
                      8,
                      10
                    ],
                    "result": "上海交通大学医学院附属瑞金医院",
                    "validation_time": "2017-09-20 10:17:11",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 266
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "浦东新区人民医院",
                      "浦东新区人民医院",
                      "浦东新区人民医院"
                    ],
                    "pic": "/token/img/e6183f5942c5a8fab9843f8a3eb598e1",
                    "project": "hospital",
                    "user_ids": [
                      9,
                      8,
                      10
                    ],
                    "result": "浦东新区人民医院",
                    "validation_time": "2017-09-20 10:17:12",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 267
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海市闵行区中心医院",
                      "上海市闵行区中心医院",
                      "上海市闵行区中心医院"
                    ],
                    "pic": "/token/img/2669c9552696ba899715c43ef2b1af43",
                    "project": "hospital",
                    "user_ids": [
                      9,
                      10,
                      3
                    ],
                    "result": "上海市闵行区中心医院",
                    "validation_time": "2017-09-20 17:56:42",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 268
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海市闵行区中心医院",
                      "上海市闵行区中心医院",
                      "上海市闵行区中心医院"
                    ],
                    "pic": "/token/img/1c3d63ce0b831f6cabd6426870e6d85e",
                    "project": "hospital",
                    "user_ids": [
                      9,
                      10,
                      3
                    ],
                    "result": "上海市闵行区中心医院",
                    "validation_time": "2017-09-20 17:56:43",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 269
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "第十人民医院同济大学附属第十人民医院",
                      "第十人民医院同济大学附属第十人民医院",
                      "第十人民医院同济大学附属第十人民医院"
                    ],
                    "pic": "/token/img/b2ff31bb4034fed2abc9b6dae4054215",
                    "project": "hospital",
                    "user_ids": [
                      9,
                      1,
                      4
                    ],
                    "result": "第十人民医院同济大学附属第十人民医院",
                    "validation_time": "2017-09-20 15:51:33",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 270
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海中医药大学附属岳阳中西医结合医院",
                      "上海中医药大学附属岳阳中西医结合医院",
                      "上海中医药大学附属岳阳中西医结合医院"
                    ],
                    "pic": "/token/img/11ffcdaa82b786fd187002267caaaf5d",
                    "project": "hospital",
                    "user_ids": [
                      9,
                      4,
                      1
                    ],
                    "result": "上海中医药大学附属岳阳中西医结合医院",
                    "validation_time": "2017-09-20 15:51:34",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 271
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海中医药大学附属岳阳中西医结合医院",
                      "上海中医药大学附属岳阳中西医结合医院",
                      "上海中医药大学附属岳阳中西医结合医院"
                    ],
                    "pic": "/token/img/7a516ef3faada0530bb75aafb60dc6de",
                    "project": "hospital",
                    "user_ids": [
                      9,
                      4,
                      1
                    ],
                    "result": "上海中医药大学附属岳阳中西医结合医院",
                    "validation_time": "2017-09-20 15:51:36",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 272
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海市第五人民医院",
                      "上海市第五人民医院",
                      "上海市第五人民医院"
                    ],
                    "pic": "/token/img/1b75aa8dbed5c0da75fbb87a99ba0fb2",
                    "project": "hospital",
                    "user_ids": [
                      9,
                      4,
                      1
                    ],
                    "result": "上海市第五人民医院",
                    "validation_time": "2017-09-20 15:51:38",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 273
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海中医药大学附属龙华医院",
                      "上海中医药大学附属龙华医院",
                      "上海中医药大学附属龙华医院"
                    ],
                    "pic": "/token/img/f4ad5b2b43b23eba9a3a55d8cea49ea3",
                    "project": "hospital",
                    "user_ids": [
                      9,
                      4,
                      1
                    ],
                    "result": "上海中医药大学附属龙华医院",
                    "validation_time": "2017-09-20 15:51:39",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 274
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "闵行区颛桥社区卫生服务中心",
                      "看不清",
                      "闵行区颛桥社区卫生服务中心"
                    ],
                    "pic": "/token/img/293d03d87ecdb667419ac41b814fdfbe",
                    "project": "hospital",
                    "user_ids": [
                      9,
                      4,
                      1
                    ],
                    "result": "闵行区颛桥社区卫生服务中心",
                    "validation_time": "2017-09-20 15:51:39",
                    "system_judge": [
                      1,
                      2,
                      1
                    ],
                    "id": 275
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "复旦大学附属华山医院",
                      "复旦大学附属华山医院",
                      "复旦大学附属华山医院"
                    ],
                    "pic": "/token/img/5a65adffc8750a8a43e7b47c9b514be0",
                    "project": "hospital",
                    "user_ids": [
                      4,
                      1,
                      3
                    ],
                    "result": "复旦大学附属华山医院",
                    "validation_time": "2017-09-20 17:56:45",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 276
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海中医药大学附属岳阳中西医结合医院",
                      "上海中医药大学附属岳阳中西医结合医院",
                      "上海中医药大学附属岳阳中西医结合医院"
                    ],
                    "pic": "/token/img/a25ef4559f2ea28b225d05cd7867d818",
                    "project": "hospital",
                    "user_ids": [
                      4,
                      1,
                      3
                    ],
                    "result": "上海中医药大学附属岳阳中西医结合医院",
                    "validation_time": "2017-09-20 17:56:46",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 277
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海市同仁医院",
                      "上海市同仁医院",
                      "上海市同仁医院"
                    ],
                    "pic": "/token/img/3132f412ca49521bba591015e626a8a5",
                    "project": "hospital",
                    "user_ids": [
                      4,
                      1,
                      3
                    ],
                    "result": "上海市同仁医院",
                    "validation_time": "2017-09-20 17:56:47",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 278
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海交通大学医学院附属新华医院",
                      "上海交通大学医学院附属新华医院",
                      "上海交通大学医学院附属新华医院"
                    ],
                    "pic": "/token/img/f9fd6413706e80d8a2414add0ea3f632",
                    "project": "hospital",
                    "user_ids": [
                      4,
                      1,
                      3
                    ],
                    "result": "上海交通大学医学院附属新华医院",
                    "validation_time": "2017-09-20 17:56:48",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 279
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海交通大学医学院附属仁济医院",
                      "上海交通大学医学院附属仁济医院",
                      "上海交通大学医学院附属仁济医院"
                    ],
                    "pic": "/token/img/bec3822520a4b743cebd8f5a0517c81b",
                    "project": "hospital",
                    "user_ids": [
                      4,
                      1,
                      3
                    ],
                    "result": "上海交通大学医学院附属仁济医院",
                    "validation_time": "2017-09-20 17:56:50",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 280
                  },{
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海市闵行区中心医院",
                      "上海市闵行区中心医院",
                      "上海市闵行区中心医院"
                    ],
                    "pic": "/token/img/d894888828296b1973436ef54b9cb2da",
                    "project": "hospital",
                    "user_ids": [
                      8,
                      4,
                      10
                    ],
                    "result": "上海市闵行区中心医院",
                    "validation_time": "2017-09-20 15:07:34",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 243
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "复旦大学附属肿瘤医院",
                      "复旦大学附属肿瘤医院",
                      "复旦大学附属肿瘤医院"
                    ],
                    "pic": "/token/img/b0e2dffcb6ff65dbaba9411a39d36301",
                    "project": "hospital",
                    "user_ids": [
                      8,
                      10,
                      9
                    ],
                    "result": "复旦大学附属肿瘤医院",
                    "validation_time": "2017-09-18 17:56:01",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 244
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海中医药大学附属岳阳中西医结合医院",
                      "上海中医药大学附属岳阳中西医结合医院",
                      "上海中医药大学附属岳阳中西医结合医院"
                    ],
                    "pic": "/token/img/e84040ace8d1f764845e864c97ad86a9",
                    "project": "hospital",
                    "user_ids": [
                      10,
                      8,
                      9
                    ],
                    "result": "上海中医药大学附属岳阳中西医结合医院",
                    "validation_time": "2017-09-18 17:56:02",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 245
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海市静安区中心医院复旦大学附属华山医院静安分院",
                      "上海市静安区中心医院复旦大学附属华山医院静安分院",
                      "上海市静安区中心医院复旦大学附属华山医院静安分院"
                    ],
                    "pic": "/token/img/345f22d3d69b717474b874fe5a2b92c5",
                    "project": "hospital",
                    "user_ids": [
                      10,
                      8,
                      9
                    ],
                    "result": "上海市静安区中心医院复旦大学附属华山医院静安分院",
                    "validation_time": "2017-09-18 17:56:04",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 246
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海市静安区中心医院复旦大学附属华山医院静安分院",
                      "上海市静安区中心医院复旦大学附属华山医院静安分院",
                      "上海市静安区中心医院复旦大学附属华山医院静安分院"
                    ],
                    "pic": "/token/img/5c17c723bf2c48ff957815a93d6b74ab",
                    "project": "hospital",
                    "user_ids": [
                      10,
                      8,
                      9
                    ],
                    "result": "上海市静安区中心医院复旦大学附属华山医院静安分院",
                    "validation_time": "2017-09-18 17:56:06",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 247
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "公利医院",
                      "公利医院",
                      "公利医院"
                    ],
                    "pic": "/token/img/20dc55f5959f36896bc5b68bde7e64ef",
                    "project": "hospital",
                    "user_ids": [
                      9,
                      10,
                      8
                    ],
                    "result": "公利医院",
                    "validation_time": "2017-09-18 17:56:07",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 248
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "静安区江宁路街道社区卫生服务中心",
                      "静安区江宁路街道社区卫生服务中心",
                      "静安区江宁路街道社区卫生服务中心"
                    ],
                    "pic": "/token/img/94427e1dbca505e0218985b994b69d0c",
                    "project": "hospital",
                    "user_ids": [
                      10,
                      8,
                      9
                    ],
                    "result": "静安区江宁路街道社区卫生服务中心",
                    "validation_time": "2017-09-18 17:56:08",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 249
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海中医药大学附属岳阳中西医结合医院",
                      "上海中医药大学附属岳阳中西医结合医院",
                      "上海中医药大学附属岳阳中西医结合医院"
                    ],
                    "pic": "/token/img/7562bfdac8e48b2a9bb343bf16f44513",
                    "project": "hospital",
                    "user_ids": [
                      10,
                      8,
                      9
                    ],
                    "result": "上海中医药大学附属岳阳中西医结合医院",
                    "validation_time": "2017-09-18 17:56:10",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 250
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海交通大学医学院附属仁济医院",
                      "上海交通大学医学院附属仁济医院",
                      "上海交通大学医学院附属仁济医院"
                    ],
                    "pic": "/token/img/15f56af3e21edd27f4c31fe99174078e",
                    "project": "hospital",
                    "user_ids": [
                      10,
                      9,
                      8
                    ],
                    "result": "上海交通大学医学院附属仁济医院",
                    "validation_time": "2017-09-18 17:56:11",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 251
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海中医药大学附属岳阳中西医结合医院",
                      "上海中医药大学附属岳阳中西医结合医院",
                      "上海中医药大学附属岳阳中西医结合医院"
                    ],
                    "pic": "/token/img/348b5e199d50e22d99a043b0ebf981f6",
                    "project": "hospital",
                    "user_ids": [
                      9,
                      10,
                      8
                    ],
                    "result": "上海中医药大学附属岳阳中西医结合医院",
                    "validation_time": "2017-09-18 17:56:13",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 252
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海交通大学医学院附属仁济医院",
                      "上海交通大学医学院附属仁济医院",
                      "上海交通大学医学院附属仁济医院"
                    ],
                    "pic": "/token/img/f2eeb3ae063bffcbeebee3db3c48b317",
                    "project": "hospital",
                    "user_ids": [
                      10,
                      9,
                      8
                    ],
                    "result": "上海交通大学医学院附属仁济医院",
                    "validation_time": "2017-09-18 17:56:16",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 253
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海中医药大学附属岳阳中西医结合医院",
                      "上海中医药大学附属岳阳中西医结合医院",
                      "上海中医药大学附属岳阳中西医结合医院"
                    ],
                    "pic": "/token/img/2bd3f0c716ea6c5b4e7a0a96e4023bfe",
                    "project": "hospital",
                    "user_ids": [
                      10,
                      9,
                      8
                    ],
                    "result": "上海中医药大学附属岳阳中西医结合医院",
                    "validation_time": "2017-09-18 17:56:18",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 254
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海交通大学医学院附属仁济医院",
                      "上海交通大学医学院附属仁济医院",
                      "上海交通大学医学院附属仁济医院"
                    ],
                    "pic": "/token/img/80c7b2876d9ff400f71716d8371bf659",
                    "project": "hospital",
                    "user_ids": [
                      10,
                      9,
                      8
                    ],
                    "result": "上海交通大学医学院附属仁济医院",
                    "validation_time": "2017-09-18 17:56:20",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 255
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海交通大学医学院附属瑞金医院",
                      "上海交通大学医学院附属瑞金医院",
                      "上海交通大学医学院附属瑞金医院"
                    ],
                    "pic": "/token/img/cc3af9cb8ff215acd10bf86c9247f66b",
                    "project": "hospital",
                    "user_ids": [
                      10,
                      9,
                      8
                    ],
                    "result": "上海交通大学医学院附属瑞金医院",
                    "validation_time": "2017-09-18 17:56:21",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 256
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海市闵行区中心医院",
                      "上海市闵行区中心医院",
                      "上海市闵行区中心医院"
                    ],
                    "pic": "/token/img/6b1299f824f4ed61f69f5b9c431b1e2c",
                    "project": "hospital",
                    "user_ids": [
                      10,
                      9,
                      8
                    ],
                    "result": "上海市闵行区中心医院",
                    "validation_time": "2017-09-18 17:58:01",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 257
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "复旦大学附属妇产科医院",
                      "复旦大学附属妇产科医院",
                      "复旦大学附属妇产科医院"
                    ],
                    "pic": "/token/img/8dc361d46423136c000fdc582245b18e",
                    "project": "hospital",
                    "user_ids": [
                      10,
                      9,
                      8
                    ],
                    "result": "复旦大学附属妇产科医院",
                    "validation_time": "2017-09-18 17:58:06",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 258
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海市黄浦区中心医院",
                      "上海市黄浦区中心医院",
                      "上海市黄浦区中心医院"
                    ],
                    "pic": "/token/img/491198e8933615bfb2350bcf3c29d3fb",
                    "project": "hospital",
                    "user_ids": [
                      10,
                      9,
                      8
                    ],
                    "result": "上海市黄浦区中心医院",
                    "validation_time": "2017-09-18 17:58:08",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 259
                  },
                  {
                    "latest_judge": [
                      0,
                      0,
                      0
                    ],
                    "answer_list": [
                      "上海市第八人民医院",
                      "上海市第八人民医院",
                      "上海市第八人民医院"
                    ],
                    "pic": "/token/img/10667592962d37bacb41db8035f80b01",
                    "project": "hospital",
                    "user_ids": [
                      9,
                      10,
                      8
                    ],
                    "result": "上海市第八人民医院",
                    "validation_time": "2017-09-20 10:17:02",
                    "system_judge": [
                      1,
                      1,
                      1
                    ],
                    "id": 260
                  }
                ],
                "page": 25,
                "project_names": [
                  "hospital"
                ]
              },
              "message": "operate successfully",
              "code": 200
            };
            var len = json.body.tasks.length;
            var proposals = [];
            for(var i=0;i<len;i++){
              proposals.push(json.body.tasks[i].answer_list[2]);
            }
            // proposals=Array.from(new Set(proposals));
            $('#search-form').autocomplete({
              hints: proposals,
              width: 300,
              height: 44
            });

            break;
          case 'total':
            way.setInputVal = function (task) {
              setInputVal(task);
            };
            way.textAnswer = function () {
              return $('.showInfo').val();
            };
            break;
          case 'date':
            way.setInputVal = function (task) {
              var now = new Date();
              var defaultDate = (now.getFullYear()+""+((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1)+""+(now.getDate()<10?"0":"")+now.getDate());
              var config = {
                'task': task,
                'n': 8,
                'ds': defaultDate,
                'blockStr': blockStr,
                'maxY': maxYear,
                'minY': minYear,
                'today': defaultDate
              };
              setInputVal(config);
              datePlugin(blockStr,minYear,maxYear);
            };
            way.textAnswer = function () {
              return getCurStr();
            };
            break;
        }

        canSubmit = true;
        imgHandleFn(task);

        way.setInputVal(task);

        $('#next,#indistinct').prop('disabled', false);
        var interface = gInterface;
        showPageData(task, tokenStr, interface);
        bindJumpNative(taskType);

        //拿到token判断有没登录
        if (!tokenStr) {
          flag = 1;
          console.log('没有拿到token值！');
          noTokenHandle();
        } else {
          console.log('拿到了token值，为 ' + tokenStr);
          $('#toLogin').hide();
          flag = 0;

          //点击下一张按钮
          $('#next,#indistinct').off(touchstart).on(touchstart, function () {
            console.log('next按钮点击了');
            $('#next,#indistinct').prop('disabled', true);

            var touchstartWhich = $(this).attr('id') == 'indistinct';
            if (!window.navigator.onLine) {
              $("#showMes").hide();
              $('#offLine').show();
              flag = 1;
              $('#sureBtn').off(touchstart).on(touchstart, function () {
                $('#offLine').hide();
                flag = 0;
              });
            } else {
              if (canSubmit) {
                $("#showMes").show();
                flag = 1;

                canSubmit = false;

                var answer = touchstartWhich ? {"text": '看不清'} : {"text": way.textAnswer()};

                console.log('整理答案中: '+answer);
                console.log(answer);

                normalSubmit(task, answer, tokenStr, interface, deferred, getDataFail);
              }
            }
          });
        }
      }else{
        console.log('jsloadDone is false, so jsloadDoneTimer continue');
      }
    }, 50);

  }
  else {
    console.log('运行presentTask函数时候已经没有任务了,自动重新刷新页面获取可用任务');
    console.log('只加载本次任务，不会出现这个日志');
  }
});
pybossa.run('date');