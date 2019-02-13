#ifndef TV_H
#define TV_H


class tv
{
public:
	tv( int kan, int max_g= 100 );
	const tv operator++( int );//glosniej();//post++
	const tv operator--( int );//ciszej();//post--
	tv& operator++();//nast();//pre++
	tv& operator--();//pop();//pre--
	int operator=( int nr );//kanal( unsigned k );//=
	tv& operator!();//wl_wyl();//!
	friend ostream& operator<<( ostream& o, tv t );//void stan();
private:
	int kanal;
	int gl;
	bool wl;
	const int max_g;
	const int il_kan;
};

#endif // TV_H
