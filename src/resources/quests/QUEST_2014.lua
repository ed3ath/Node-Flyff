QUEST_2014 = {
	title = 'IDS_PROPQUEST_REQUESTBOX_INC_000155',
	character = 'MaFl_Mikyel',
	end_character = 'MaFl_Mikyel',
	start_requirements = {
		min_level = 25,
		max_level = 27,
		job = { 'JOB_ASSIST', 'JOB_MERCENARY', 'JOB_MAGICIAN', 'JOB_ACROBAT' },
		previous_quest = '',
	},
	rewards = {
		gold = 12500,
		exp = 9400,
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_FURIOUSMATCH', quantity = 17, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000156',
		},
		begin_yes = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000157',
		},
		begin_no = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000158',
		},
		completed = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000159',
		},
		not_finished = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000160',
		},
	}
}
