import scrapy
from ..items import FirstscrapingItem
import arabic_reshaper
from bidi.algorithm import get_display

import re
class wataniSpider(scrapy.Spider):
    name = 'zap'
    start_urls = [
    # 'https://www.la2ta.com/index.php?route=product/category&path=102_210_333&ajaxfilter=stock_status,in-stock&ref=1'
       'https://www.la2ta.com/index.php?route=product/category&path=102_210_335&ajaxfilter=stock_status,in-stock'
        ]
    def parse(self, response):

        items = FirstscrapingItem()
        for i in range(0, 23):
            name = response.css('div.caption h4 a::text').extract()[i].strip()
            reshaped_text = arabic_reshaper.reshape(name)
            bidi_text = get_display(reshaped_text)
            name = bidi_text
            url = response.css("div.caption h4 a").xpath("@href").extract()[i].strip()
            price = response.css('span.price-new::text').extract()[i].strip('₪')
            price = price.split(',',2)
            # price = price[0].split('٬',2)
            if(len(price)>1) :
                price = price[0] + price[1]
            else:
                price = price[0]
            price = int(price)
            img = response.css('div.product-image-container img').xpath("@src").extract()[i].strip()
            #xpath('//img/@src')
            # float(number_string.replace(',', '').replace('$', ''))
            items["name"] = name
            items["url"] = url
            items["price"] = price
            items["image_urls"] = img
            yield items
        # next_page = response.css('li.pages-item-next a::attr(href)').get()
        # if next_page is not None:
        #     yield response.follow(next_page, callback= self.parse)









