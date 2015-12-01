from celery.task.schedules import crontab
from celery.decorators import periodic_task
from celery.decorators import task
from celery.utils.log import get_task_logger
from datetime import datetime

logger = get_task_logger(__name__)

@task(name="sum_two_numbers")
def add(x, y):
    return x + y

@task(name="get_unsplash_image")
def get_unsplash_image():
    pass

@periodic_task(run_every=(crontab(hour='*', minute='*')))
def scraper_example():
    logger.info('Start Task')
    now = datetime.now()
    result = now.day, now.minute
    logger.info('Task finished: result = {}'.format(result))
