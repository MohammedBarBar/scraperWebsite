import scrapy
from ..items import FirstscrapingItem

import re
class wataniSpider(scrapy.Spider):
    name = 'watani'
    start_urls = [
       'https://watanimall.com/computer/desktops/desktops.html?cat=27_%D9%83%D9%85%D8%A8%D9%8A%D9%88%D8%AA%D8%B1+%D9%85%D9%83%D8%AA%D8%A8%D9%8A'
       #   'https://watanimall.com/laptop/laptops/alllaptops.html'
        ]
    def parse(self, response):
        num1 = response.css('span.toolbar-number::text')[0].extract()
        num2 = response.css('span.toolbar-number::text')[1].extract()
        count = (int(num2) - int(num1)) + 1
        items = FirstscrapingItem()
        for i in range(0, count):
            name = response.css('a.product-item-link ::text').extract()[i].strip()
            url = response.css("a.product-item-link").xpath("@href").extract()[i].strip()
            price = response.css('span.price-container span.price::text').extract()[i].strip('₪')
            price = price.split('٫',2)
            price = price[0].split('٬',2)
            if(len(price)>1) :
                price = price[0] + price[1]
            else:
                price = price[0]
            price = int(price)
            img = response.css('img.main-img').xpath("@src").extract()[i].strip()
            #xpath('//img/@src')
            # float(number_string.replace(',', '').replace('$', ''))
            items["name"] = name
            items["url"] = url
            items["price"] = price
            items["image_urls"] = img
            yield items
        next_page = response.css('li.pages-item-next a::attr(href)').get()
        if next_page is not None:
            yield response.follow(next_page, callback= self.parse)









