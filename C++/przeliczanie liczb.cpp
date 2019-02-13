#include <iostream>
using namespace std;

int horner(int[] ,int , int );
int horner_rek(int[],int , int);
void tosys(int x, int sysout) ;



int main(){
	int *t_wspol;
	int ilo, sysin, sysout;
	string s;
	
	cout<<"Podaj system wejsciowy: ";
	cin>>sysin;
	
	t_wspol = new int [ilo];
		
	cout<<"Podaj liczbe do konwersji: ";
	cin>>s;
	
		ilo = s.length();
	
	for(int i=0;i<ilo;i++) {
		t_wspol[i] = s[i] - int('0');
	}
	
	cout<<"Podaj system wyjsciowy: ";
	cin>>sysout;
	
	if(sysin == sysout) {
		cout<<"W systemie 10 = ";
		for(int i = ilo;i<ilo;i++) {
			cout<<i;
		}
		cout<<endl;
	}
	else {
		if(sysout == 10) {
			cout<<"W systemie 10 = "<<horner(t_wspol,ilo,sysin)<<endl;
		}else{
		
			int wynik = horner(t_wspol,ilo,sysin);
			tosys(wynik, sysout);
		}
	}	
	
	//cout<<"W( "<<arg<<" ) = "<<horner_rek(t_wspol,stop,arg)<<endl;
		
	delete [] t_wspol;
	system("pause");
	return 0;
}


//iteracyjnie
int horner(int wsp[],int st, int x) 
{
	int wynik;
	
	for(int i= 0;i<st;i++)
	wynik = wynik*x + wsp[i];
	
	return wynik;
}

//dziesietna na dowolny system
void tosys(int x, int sysout) 
{ 	
	int wyn[100];	
	int k = 0;
	while(x>=1){	
		wyn[k] = x%sysout;		
		k++; 	
	
		x/= sysout;		
		//cout<<x%sysout<<endl;
	}
	
	cout<<"Wynik w systemie "<<sysout<<" = ";
	while(k>0) {
		k--;
		cout<<wyn[k];
	}
	
	cout<< endl;
}

//rekurencyjnie
int horner_rek(int wsp[],int st, int x)
{ 	
  	if(st==0)
  		return wsp[0];
  		
  	return x* horner_rek(wsp, st-1, x)+ wsp[st];
}



