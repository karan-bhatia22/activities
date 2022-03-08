def fun():
    # boolean data type (bool) either True or False
    # in Python 2.x and 3.x bool is also an int. bool is a subclass of int
    x = 10
    y = True
    print(isinstance(x, bool))  # False (int is not a bool)
    print(isinstance(y, int))  # True (bool is an int)
    print()
    # integer data type. ints are of arbitrary length in python

    # float data type. precision depends on system architecture and implementation.

    a = 2.0  # 2.0
    b = 2.e0  # 2.0
    c = 2.e1  # 20.0
    print(a, b, c)
    print()
    # complex data type.
    a = 2 + 10j
    b = 10 + 2j

    # print(a > b) will print error since >, <, >=, <= are not supported between complex number data types in python

    # string data type.
    s = 'hello'
    print(type(s))  # class 'str'
    s = b'hello'
    print(type(s))  # class 'bytes'
    print()
    # sequences and collections

    # 1. tuples

    a = (1, 2, 3)
    b = ('a', 1, 'python', (1, 2))
    print(a)
    print(b)
    print()

    # b[2] = 10
    # print(b) will print error since tuples are immutable in python

    # 2. lists

    a = [1, 2, 3]
    # lists in python can contain unhomogenous data types
    b = ['a', 1, 'python', (1, 2), [1, 2]]
    print(a)
    print(b)
    b[2] = 10
    print(b)
    print()

    # 3. sets

    # takes in an iterable. since lists can contain unhomogenous data types thus sets can also contain  unhomogenous data types
    a = set([1, 2, 'a'])
    b = {1, 2, 'a'}

    print("a: ", a)
    print("b: ", b)

    print(a == b)  # sets defined by both the styles are equal
    # but one set is not the same as the second set. both are not congruent.
    print(a is b)
    print()
    # 4. dictionary.

    # dict can be defined directly as an object or an array or pairs can be passed inside the dict() which takes first value of pair as the key and second as the value
    a = {1: 'one', 2: 'two'}
    b = dict([(1, 'one'), (2, 'two')])

    print('a: ', a)
    print('b: ', b)
    print(a == b)
    print(a is b)
    print()

    # difference between isinstance() and type()
    a = 10
    b = True
    print(type(a) == int)  # True
    print(type(b) == int)  # False
    print(isinstance(b, int))  # True!!!!
    # boolean is a subclass of int and hence b is an instance of int too
    print()

    # conversion between data types
    a = 'hello'
    # print(int(a)) gives error
    print(list(a))  # ['h', 'e', 'l', 'l', 'o']
    print(set(a))  # {'h', 'e', 'l', 'o'}
    print(tuple(a))  # ('h', 'e', 'l', 'l', 'o')
    print()


if __name__ == "__main__":
    fun()
