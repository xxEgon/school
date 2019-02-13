#include "tv.h"

tv::tv(int kan, int max_g): max_g( max_g ), il_kan( kan )
{
	kanal= 0;
	gl= 0;
	wl= false;
}

const tv tv::operator++(int)
{
	tv kop;
	kop= *this;
	if( wl&& gl!= max_g )
		gl++;
	return kop;
}

const tv tv::operator--(int)
{

}

tv& tv::operator++()
{
	if( wl )
	{
		kanal++; //kanaly [0,il_kan)
		kanal%= il_kan;
	}
	return *this;
}

tv& tv::operator--()
{
	if( wl )
		kanal= ( kanal- 2+ il_kan )% il_kan+ 1; //kanaly [1,il_kan]
	return *this;
}

int tv::operator=(int nr)
{
	if( wl&& nr>= 0&& nr< il_kan )
		kanal= nr;
	return nr;
}

tv& tv::operator!()
{
	wl= !wl;
	return *this;
}

ostream& operator<<( ostream& o, tv t )
{
	o<<"kanal "<< kanal<<'/'<< il_kan;
	return o;
}

bool ciszej();
bool nast();
bool pop();
bool kanal( unsigned k );
bool wl_wyl();

bool tv::wl_wyl()
{
	return wl= !wl;
}

bool tv::glosniej()
{
	if( !wl )
		return false;
	if( gl== max_g )
		return false;
	gl++;
	return true;
}

bool tv::ciszej()
{
	if( !wl )
		return false;
	if( gl== 0 )
		return false;
	gl--;
	return true;
}

bool tv::nast()
{
	if( !wl )
		return false;
	kanal++;
	kanal%= il_kan;
	return true;
}

bool tv::pop()
{
	if( !wl )
		return false;
	kanal= ( kanal- 1+ il_kan )% il_kan;
	return true;
}

bool tv::kanal(unsigned k)
{
	if( !wl || k>= il_kan )
		return false;
	kanal= k;
	return true;
}

#include <iostream>
using namespace std;
void tv::stan()
{
	cout<< kanal<<'/'<< il_kan;
}

