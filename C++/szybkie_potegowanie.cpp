#include <iostream>
using namespace std;

long long int sz_pot_it(int, int );
long long int sz_pot_rek(long long int, int);

int main() {
	
	int pod, wyk;
	
	cout<< "Podstawa: ";
	cin>> pod;
	cout<< "Wykladnik: ";
	cin>> wyk;
	
	cout<<"Wynik iteracyjnie: "<< sz_pot_it(pod, wyk) << endl;
	cout<<"Wynik rekurencyjnie: "<< sz_pot_rek(pod, wyk) <<endl;

	system("pause");
	return 0;
}

//iteracyjnie
long long int sz_pot_it(int pod, int wyk)
{
	long long int wyn = 1;
	
	while(wyk> 0)
	{
		if (wyk%2 == 1) 
			wyn *= pod;	
		pod*= pod;
		wyk/=2; 
	}
	return wyn;
} 

//rekurencyjnie
long long int sz_pot_rek(long long int pod, int wyk)
{
	if(wyk == 0)
		return 1;
	if(wyk%2 == 1)
		return pod * sz_pot_rek(pod, wyk - 1);
	
	long long w = sz_pot_rek(pod, wyk/2); 
	return w * w;
}
