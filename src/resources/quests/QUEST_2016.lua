QUEST_2016 = {
	title = 'IDS_PROPQUEST_REQUESTBOX_INC_000177',
	character = 'MaSa_Lancomi',
	end_character = 'MaSa_Lancomi',
	start_requirements = {
		min_level = 27,
		max_level = 32,
		job = { 'JOB_ASSIST', 'JOB_MERCENARY', 'JOB_MAGICIAN', 'JOB_ACROBAT' },
		previous_quest = '',
	},
	rewards = {
		gold = 27000,
		exp = 11486,
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_CARDRIN', quantity = 30, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000178',
		},
		begin_yes = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000179',
		},
		begin_no = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000180',
		},
		completed = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000181',
		},
		not_finished = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000182',
		},
	}
}
