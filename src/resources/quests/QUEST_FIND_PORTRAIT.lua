QUEST_FIND_PORTRAIT = {
	title = 'IDS_PROPQUEST_INC_000894',
	character = 'MaFl_Rudvihil',
	end_character = 'MaSa_Helgar',
	start_requirements = {
		min_level = 26,
		max_level = 30,
		job = { 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN' },
		previous_quest = '',
	},
	rewards = {
		gold = 0,
		exp = 1645,
	},
	end_conditions = {
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_000895',
			'IDS_PROPQUEST_INC_000896',
			'IDS_PROPQUEST_INC_000897',
			'IDS_PROPQUEST_INC_000898',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_000899',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_000900',
		},
		completed = {
			'IDS_PROPQUEST_INC_000901',
			'IDS_PROPQUEST_INC_000902',
			'IDS_PROPQUEST_INC_000903',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_000904',
		},
	}
}
