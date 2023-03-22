from tqdm import tqdm
from time import sleep

bar = tqdm(range(10))

print('Now')
print(bar)

bar.n = 3
print(bar)

bar.n = 6
print(bar)

bar.n = 10
print(bar)
# for i in bar:
#     sleep(1)
#
# fmt = '{n_fmt} of {total_fmt} {percentage:3.0f}%'
# iteration = (3, 2, 1, 4)  # filesize
# bar = tqdm(total=sum(iteration), miniters=1, bar_format=fmt)
# for i in iteration:  # by file process
#     sleep(i)
#     bar.update(i)