QUEST_2032 = {
	title = 'IDS_PROPQUEST_REQUESTBOX_INC_000353',
	character = 'MaDa_Lurif',
	end_character = 'MaDa_Lurif',
	start_requirements = {
		min_level = 87,
		max_level = 93,
		job = { 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR', 'JOB_KNIGHT_MASTER', 'JOB_BLADE_MASTER', 'JOB_JESTER_MASTER', 'JOB_RANGER_MASTER', 'JOB_RINGMASTER_MASTER', 'JOB_BILLPOSTER_MASTER', 'JOB_PSYCHIKEEPER_MASTER', 'JOB_ELEMENTOR_MASTER', 'JOB_KNIGHT_HERO', 'JOB_BLADE_HERO', 'JOB_JESTER_HERO', 'JOB_RANGER_HERO', 'JOB_RINGMASTER_HERO', 'JOB_BILLPOSTER_HERO', 'JOB_PSYCHIKEEPER_HERO', 'JOB_ELEMENTOR_HERO' },
		previous_quest = '',
	},
	rewards = {
		gold = 130500,
		exp = 74981371,
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_GRBANDAGE', quantity = 45, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000354',
		},
		begin_yes = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000355',
		},
		begin_no = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000356',
		},
		completed = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000357',
		},
		not_finished = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000358',
		},
	}
}
