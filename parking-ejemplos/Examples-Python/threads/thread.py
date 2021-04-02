from time import sleep

import threading
 
def print_geometry(type_geometry,seconds,num):
    print("{}: {}".format(type_geometry,num * num * num))
    sleep(seconds)
    print("{} Finish".format(type_geometry))
 
if __name__ == "__main__":
    # creating thread
    t1 = threading.Thread(target=print_geometry, args=('Square',5,10,))
    t2 = threading.Thread(target=print_geometry, args=('Cube',2,10,))
 
    # starting thread 1
    t1.start()
    # starting thread 2
    t2.start()
 
    # wait until thread 1 is completely executed
    #t1.join()
    # wait until thread 2 is completely executed
    #t2.join()
 
    # both threads completely executed
    print("Done!")