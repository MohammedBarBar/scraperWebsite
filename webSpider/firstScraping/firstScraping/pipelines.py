# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html
import pymongo



class FirstscrapingPipeline(object):
    def __init__(self):
        self.conn = pymongo.MongoClient(
            'localhost',
            27017
        )

        db = self.conn['demo_db']
        self.collection = db['DemoApp_laptops']
        # db.lab.copyTo('DemoApp_laptops')

    def process_item(self, item, spider):
        self.collection.insert_one(dict(item))
        return item
