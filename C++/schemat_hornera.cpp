#include <iostream>
using namespace std;

int horner(int[] ,int , int );
int horner_rek(int[],int , int);

int main(){
	int *t_wspol;
	int stop, arg;
	
	cout<<"Podaj stop wielomianu: ";
	cin>>stop;
	
	t_wspol = new int [stop+1];
	
	for(int i=0;i<=stop;i++)
	{
		cout<<"Podaj wspolczynnik przy potedze "<<stop-i<<": ";
		cin>>t_wspol[i];
	}
	
	cout<<"Podaj arg: ";
	cin>>arg;
	
	//cout<<"W( "<<arg<<" ) = "<<horner(t_wspol,stop,arg)<<endl;
	cout<<"W( "<<arg<<" ) = "<<horner_rek(t_wspol,stop,arg)<<endl;
		
	delete [] t_wspol;
	system("pause");
	return 0;
}

//iteracyjnie
int horner(int wsp[],int st, int x) 
{
	int wynik;
	
	for(int i= 0;i<=st;i++)
	wynik = wynik*x + wsp[i];
	
	return wynik;
}

//rekurencyjnie
int horner_rek(int wsp[],int st, int x)
{ 	
  	if(st==0)
  		return wsp[0];
  		
  	return x* horner_rek(wsp, st-1, x)+ wsp[st];
}


